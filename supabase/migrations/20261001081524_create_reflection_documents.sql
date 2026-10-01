/*
# Create reflection_documents table and PDF storage bucket

## Overview
This migration creates the data layer for the E-Portofolio PPG Prajabatan
PDF reflection management system. It stores metadata about uploaded PDF
reflection documents, one per course, and creates a storage bucket for the
actual PDF files.

## New Tables
- `reflection_documents`
  - `id` (uuid, primary key)
  - `course_id` (text, not null) — links to one of the six PPG courses by slug
  - `title` (text, not null) — display title for the document
  - `description` (text, nullable) — short description of the document
  - `file_name` (text, not null) — original uploaded file name
  - `file_size` (bigint, not null) — file size in bytes
  - `storage_path` (text, not null) — path within the storage bucket
  - `upload_date` (timestamptz, default now()) — when the document was uploaded
  - `updated_at` (timestamptz, default now()) — last modification time

## Unique Constraint
- One reflection document per course (unique on `course_id`)

## Security — RLS
- SELECT: public (anon + authenticated) — visitors can see which courses
  have reflections available
- INSERT/UPDATE/DELETE: authenticated only — only the logged-in owner can
  manage documents

## Storage
- Creates a public bucket `reflection_pdfs` for storing PDF files
- Storage policies: public read, authenticated write/delete
*/

-- ============================================================
-- Table: reflection_documents
-- ============================================================

CREATE TABLE IF NOT EXISTS reflection_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id text NOT NULL,
  title text NOT NULL,
  description text,
  file_name text NOT NULL,
  file_size bigint NOT NULL,
  storage_path text NOT NULL,
  upload_date timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- One document per course
CREATE UNIQUE INDEX IF NOT EXISTS reflection_documents_course_id_key
  ON reflection_documents (course_id);

-- Enable RLS
ALTER TABLE reflection_documents ENABLE ROW LEVEL SECURITY;

-- Public read: visitors can see which reflections are available
DROP POLICY IF EXISTS "public_select_reflections" ON reflection_documents;
CREATE POLICY "public_select_reflections"
  ON reflection_documents FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated insert: only logged-in owner can add documents
DROP POLICY IF EXISTS "owner_insert_reflections" ON reflection_documents;
CREATE POLICY "owner_insert_reflections"
  ON reflection_documents FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated update: only logged-in owner can modify
DROP POLICY IF EXISTS "owner_update_reflections" ON reflection_documents;
CREATE POLICY "owner_update_reflections"
  ON reflection_documents FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

-- Authenticated delete: only logged-in owner can remove
DROP POLICY IF EXISTS "owner_delete_reflections" ON reflection_documents;
CREATE POLICY "owner_delete_reflections"
  ON reflection_documents FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- Storage Bucket: reflection_pdfs
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('reflection_pdfs', 'reflection_pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, authenticated write/delete
DROP POLICY IF EXISTS "Public read reflection PDFs" ON storage.objects;
CREATE POLICY "Public read reflection PDFs"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'reflection_pdfs');

DROP POLICY IF EXISTS "Authenticated insert reflection PDFs" ON storage.objects;
CREATE POLICY "Authenticated insert reflection PDFs"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'reflection_pdfs');

DROP POLICY IF EXISTS "Authenticated update reflection PDFs" ON storage.objects;
CREATE POLICY "Authenticated update reflection PDFs"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'reflection_pdfs')
  WITH CHECK (bucket_id = 'reflection_pdfs');

DROP POLICY IF EXISTS "Authenticated delete reflection PDFs" ON storage.objects;
CREATE POLICY "Authenticated delete reflection PDFs"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'reflection_pdfs');
