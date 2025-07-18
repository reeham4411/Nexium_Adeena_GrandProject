import { supabase } from './utils/supabase';
import { connectToMongo } from './utils/mongo';

async function testConnections() {
  console.log('Testing database connections...');
  
  try {
    // Test Supabase connection
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('Supabase connection failed:', error.message);
    } else {
      console.log('✅ Supabase connection successful');
    }
    
    // Test MongoDB connection
    console.log('Testing MongoDB connection...');
    const { db } = await connectToMongo();
    const collections = await db.listCollections().toArray();
    console.log('✅ MongoDB connection successful');
    console.log('Available collections:', collections.map(c => c.name));
    
    // Test journal entries collection
    const journalCount = await db.collection('journal_entries').countDocuments();
    console.log(`📝 Journal entries in database: ${journalCount}`);
    
    // Test AI analysis collection
    const analysisCount = await db.collection('ai_analysis_log').countDocuments();
    console.log(`🤖 AI analysis logs in database: ${analysisCount}`);
    
  } catch (error) {
    console.error('Connection test failed:', error);
  }
}

testConnections();