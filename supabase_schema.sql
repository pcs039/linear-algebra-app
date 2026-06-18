-- 1. quiz_attempts 테이블 생성
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Row Level Security(RLS) 활성화
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- 3. 익명 사용자(anon key)의 SELECT(조회) 및 INSERT(기록) 허용 정책 추가
DROP POLICY IF EXISTS "Allow anon insert" ON quiz_attempts;
CREATE POLICY "Allow anon insert" ON quiz_attempts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon select" ON quiz_attempts;
CREATE POLICY "Allow anon select" ON quiz_attempts FOR SELECT USING (true);
