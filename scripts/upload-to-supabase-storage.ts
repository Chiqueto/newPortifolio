import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("ERRO: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY são necessários no .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET = 'portfolio';

async function uploadFileToBucket(localPath: string, destinationPath: string, contentType: string) {
  if (!fs.existsSync(localPath)) {
    console.warn(`Arquivo local não encontrado: ${localPath}`);
    return null;
  }

  const fileBuffer = fs.readFileSync(localPath);
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(destinationPath, fileBuffer, {
      contentType,
      upsert: true
    });

  if (error) {
    console.error(`Erro ao subir ${destinationPath}:`, error.message);
    return null;
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(destinationPath);
  console.log(`✅ Upload concluído: ${destinationPath} -> ${urlData.publicUrl}`);
  return urlData.publicUrl;
}

async function run() {
  console.log("=== Enviando imagens locais para o Supabase Storage (Bucket: 'portfolio') ===");

  // 1. Imagens dos projetos
  const projectsUpload = [
    { slug: 'marcala', file: 'public/marcala.png', dest: 'projects/covers/marcala.png', mime: 'image/png' },
    { slug: 'trainvy', file: 'public/trainvy.png', dest: 'projects/covers/trainvy.png', mime: 'image/png' },
    { slug: 'smartrep', file: 'public/smartrep.png', dest: 'projects/covers/smartrep.png', mime: 'image/png' },
    { slug: 'gym-twin', file: 'public/gym-twin.png', dest: 'projects/covers/gym-twin.png', mime: 'image/png' },
    { slug: 'digital-twin-biomecanica', file: 'public/digital-twin-biomecanica.png', dest: 'projects/covers/digital-twin-biomecanica.png', mime: 'image/png' },
    { slug: 'setvision', file: 'public/setvision.png', dest: 'projects/covers/setvision.png', mime: 'image/png' },
    { slug: 'papo-torto', file: 'public/papo-torto.png', dest: 'projects/covers/papo-torto.png', mime: 'image/png' },
    { slug: 'class-line-backend', file: 'public/LOGIN-ADMIN.svg', dest: 'projects/covers/class-line-backend.svg', mime: 'image/svg+xml' },
    { slug: 'gestao-de-beneficios', file: 'public/gestao-de-beneficios.png', dest: 'projects/covers/gestao-de-beneficios.png', mime: 'image/png' },
    { slug: 'pokedex', file: 'public/capa_pokedex.png', dest: 'projects/covers/pokedex.png', mime: 'image/png' },
    { slug: 'gta-zombie-3d', file: 'public/gta-zombie.png', dest: 'projects/covers/gta-zombie.png', mime: 'image/png' },
  ];

  for (const item of projectsUpload) {
    const publicUrl = await uploadFileToBucket(item.file, item.dest, item.mime);
    if (publicUrl) {
      const { error } = await supabase
        .from('projects')
        .update({ cover_image_url: publicUrl })
        .eq('slug', item.slug);

      if (error) console.error(`Erro ao atualizar BD para ${item.slug}:`, error.message);
      else console.log(`   🔗 BD atualizado: ${item.slug} -> cover_image_url no Supabase Storage`);
    }
  }

  // 2. Avatar de perfil
  const avatarUrl = await uploadFileToBucket('public/profile_pic_cartoon.png', 'profile/avatar.png', 'image/png');
  if (avatarUrl) {
    const { error } = await supabase
      .from('profile')
      .update({ avatar_url: avatarUrl })
      .neq('id', '00000000-0000-0000-0000-000000000000');
    if (!error) console.log("   🔗 BD atualizado: profile.avatar_url no Supabase Storage");
  }

  // 3. Logos de empresas nas experiências
  const acedataUrl = await uploadFileToBucket('public/Acedata.png', 'experiences/acedata.png', 'image/png');
  if (acedataUrl) {
    await supabase.from('experiences').update({ company_logo_url: acedataUrl }).ilike('company', '%ACEDATA%');
  }

  const altaMogianaUrl = await uploadFileToBucket('public/AltaMogiana2.png', 'experiences/alta-mogiana.png', 'image/png');
  if (altaMogianaUrl) {
    await supabase.from('experiences').update({ company_logo_url: altaMogianaUrl }).ilike('company', '%Alta Mogiana%');
  }

  console.log("=== Todas as imagens foram sincronizadas no bucket do Supabase! ===");
}

run();
