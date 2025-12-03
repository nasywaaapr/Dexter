// src/services/supabaseService.js
import { supabase } from '../lib/supabase';

// ========== USER MANAGEMENT ==========

// Simpan user baru
export const createUser = async (name) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{ name }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

// Get user by name
export const getUserByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('name', name)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// ========== HARDWARE COMPONENTS ==========

// Get semua komponen
export const getAllComponents = async () => {
  try {
    const { data, error } = await supabase
      .from('hardware_components')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching components:', error);
    return [];
  }
};

// Get komponen by category
export const getComponentsByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('hardware_components')
      .select('*')
      .eq('category', category)
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching components by category:', error);
    return [];
  }
};

// Get detail komponen dengan videos
export const getComponentDetail = async (componentId) => {
  try {
    const { data: component, error: compError } = await supabase
      .from('hardware_components')
      .select('*')
      .eq('id', componentId)
      .single();
    
    if (compError) throw compError;

    const { data: videos, error: vidError } = await supabase
      .from('hardware_videos')
      .select('*')
      .eq('component_id', componentId);
    
    if (vidError) throw vidError;

    return { ...component, videos };
  } catch (error) {
    console.error('Error fetching component detail:', error);
    return null;
  }
};

// Get semua categories (unique)
export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('hardware_components')
      .select('category');
    
    if (error) throw error;
    
    // Remove duplicates
    const uniqueCategories = [...new Set(data.map(item => item.category))];
    return uniqueCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// ========== QUIZ ==========

// Get quiz questions by type
export const getQuizQuestions = async (quizType = null) => {
  try {
    let query = supabase
      .from('quiz_questions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (quizType) {
      query = query.eq('quiz_type', quizType);
    }
    
    const { data, error } = await query.limit(10);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
  }
};

// Save quiz score
export const saveQuizScore = async (userId, quizType, score, totalQuestions) => {
  try {
    const { data, error } = await supabase
      .from('user_quiz_scores')
      .insert([
        {
          user_id: userId,
          quiz_type: quizType,
          score: score,
          total_questions: totalQuestions,
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving quiz score:', error);
    return null;
  }
};

// Get user quiz history
export const getUserQuizHistory = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_quiz_scores')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    return [];
  }
};