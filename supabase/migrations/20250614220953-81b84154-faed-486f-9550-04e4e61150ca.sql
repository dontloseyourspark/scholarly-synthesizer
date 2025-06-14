
-- Check what vaccine efficacy publications exist in the database
SELECT topic_id, COUNT(*) as publication_count 
FROM topic_publications 
WHERE topic_id IN (2, 3) 
GROUP BY topic_id;

-- Also check what topics exist
SELECT id, name FROM topics WHERE id IN (2, 3);
