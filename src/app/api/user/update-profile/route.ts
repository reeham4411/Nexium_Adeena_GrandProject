import { NextRequest, NextResponse } from 'next/server';
import { authGuard } from '../../utils/auth-guard';
import { supabase } from '../../utils/supabase';
import { insertProfileSchema, insertSettingsSchema } from '../../types';

export async function PATCH(request: NextRequest) {
  try {
    const session = await authGuard();
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { profile, settings } = body;

    let updatedProfile = null;
    let updatedSettings = null;

    // Update profile if provided
    if (profile) {
      const validatedProfile = insertProfileSchema.partial().parse(profile);
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({
          ...validatedProfile,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', session.user.id)
        .select()
        .single();

      if (profileError) {
        return NextResponse.json(
          { message: profileError.message },
          { status: 400 }
        );
      }

      updatedProfile = profileData;
    }

    // Update settings if provided
    if (settings) {
      const validatedSettings = insertSettingsSchema.partial().parse(settings);
      
      // Try to update existing settings first
      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .update({
          ...validatedSettings,
          updatedAt: new Date().toISOString(),
        })
        .eq('userId', session.user.id)
        .select()
        .single();

      if (settingsError) {
        // If no settings exist, create new ones
        if (settingsError.code === 'PGRST116') {
          const { data: newSettings, error: createError } = await supabase
            .from('settings')
            .insert({
              userId: session.user.id,
              ...validatedSettings,
            })
            .select()
            .single();

          if (createError) {
            return NextResponse.json(
              { message: createError.message },
              { status: 400 }
            );
          }

          updatedSettings = newSettings;
        } else {
          return NextResponse.json(
            { message: settingsError.message },
            { status: 400 }
          );
        }
      } else {
        updatedSettings = settingsData;
      }
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: updatedProfile,
      settings: updatedSettings,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}