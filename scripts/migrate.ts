/**
 * One-time migration: creates tables and seeds initial data.
 * Run with:  npx tsx scripts/migrate.ts
 */
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, { ssl: 'require' })

async function migrate() {
  console.log('Creating tables…')

  await sql`
    CREATE TABLE IF NOT EXISTS authors (
      id          TEXT PRIMARY KEY,
      email       TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name        TEXT NOT NULL,
      bio         TEXT NOT NULL DEFAULT '',
      avatar_url  TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      slug          TEXT PRIMARY KEY,
      author_id     TEXT NOT NULL REFERENCES authors(id),
      cover_image   TEXT,
      published_at  TIMESTAMPTZ NOT NULL,
      updated_at    TIMESTAMPTZ NOT NULL,
      status        TEXT NOT NULL DEFAULT 'draft',
      tags          TEXT[] NOT NULL DEFAULT '{}',
      fallback_locale TEXT,
      content       JSONB NOT NULL DEFAULT '{}'
    )
  `

  console.log('Tables ready.')

  // ── Seed authors ──────────────────────────────────────────────────────────
  await sql`
    INSERT INTO authors (id, email, password_hash, name, bio, avatar_url, created_at)
    VALUES
      (
        'a1b2c3d4-0001-0000-0000-000000000001',
        'admin@eunoiacenters.gr',
        '$2b$10$BeiwwzbFUYlL6a3K3jZE7.x72tHnJOCsuBpx46oezLmFEVjeh.GQm',
        'Eunoia Admin',
        'Logotherapist and founder of Eunoia Centers. Specialising in meaning-centred therapy and existential counselling.',
        NULL,
        '2026-01-01T00:00:00.000Z'
      ),
      (
        'a1b2c3d4-0002-0000-0000-000000000002',
        'alkinoosmatr@gmail.com',
        '$2b$10$wl/ncBuyfO.byuOZDw..Ieyw9ax.Wr1gWAgsqbb7uKkg4GqwtlxKa',
        'Alkinoos',
        'Author at Eunoia Centers.',
        NULL,
        '2026-04-14T00:00:00.000Z'
      )
    ON CONFLICT (id) DO NOTHING
  `

  console.log('Authors seeded.')

  // ── Seed demo post ────────────────────────────────────────────────────────
  const content = {
    en: {
      title: "Finding Meaning in the Everyday: A Logotherapeutic Perspective",
      excerpt: "In a world saturated with noise and distraction, logotherapy offers a quiet but powerful invitation — to look inward, to sit with the question of meaning, and to discover that even the smallest moments carry the potential for profound significance.",
      body: `<h2>Introduction: The Question That Will Not Go Away</h2>
<p>There is a question that follows us. It surfaces in the silence between tasks, in the stillness before sleep, in the unexpected grief that arrives after an achievement we thought would satisfy us. The question is deceptively simple: <strong>Why?</strong></p>
<p>Viktor Frankl, the Viennese psychiatrist who survived three years in Nazi concentration camps including Auschwitz, spent his life answering this question — not with platitudes, but with a therapeutic system he called <strong>Logotherapy</strong>: healing through meaning.</p>
<blockquote>"He who has a why to live can bear almost any how." — Friedrich Nietzsche, quoted by Frankl in <em>Man's Search for Meaning</em></blockquote>

<h2>What Is Logotherapy?</h2>
<p>Logotherapy derives from the Greek word <em>logos</em>, which Frankl used to mean <em>meaning</em>. Its core assumptions:</p>
<ul>
<li>Life has meaning <strong>under all circumstances</strong>, even the most miserable.</li>
<li>The primary human drive is the search for meaning.</li>
<li>Human beings have the <strong>freedom to choose their attitude</strong> toward any given set of circumstances.</li>
</ul>

<h2>The Three Pathways to Meaning</h2>
<h3>1. Creative Values</h3>
<p>The first pathway is through what we create, achieve, or contribute. It is not the <em>scale</em> of the contribution that confers meaning — it is the <em>authenticity</em> of it.</p>
<h3>2. Experiential Values</h3>
<p>The second pathway is through experience — beauty, truth, love. Meaning is found in <strong>receiving</strong> — in allowing a piece of music to move you, in being genuinely present with another person.</p>
<h3>3. Attitudinal Values</h3>
<p>Even when we cannot change our circumstances, we retain one final freedom: the freedom to choose our attitude.</p>
<blockquote>"When we are no longer able to change a situation, we are challenged to change ourselves." — Viktor Frankl</blockquote>

<h2>Conclusion</h2>
<p>At Eunoia Centers, this conviction is at the heart of everything we do. We offer a space — calm, confidential, unhurried — in which you can begin to hear what your own life is asking of you.</p>
<hr>
<p><em>This article was written by Alkinoos, therapist at Eunoia Centers.</em></p>`
    },
    el: {
      title: "Η Αναζήτηση Νοήματος στην Καθημερινότητα: Μια Λογοθεραπευτική Προσέγγιση",
      excerpt: "Σε έναν κόσμο γεμάτο θόρυβο και περισπασμούς, η λογοθεραπεία προσφέρει μια ήσυχη αλλά ισχυρή πρόσκληση — να στραφούμε εσωτερικά, να καθίσουμε με την ερώτηση του νοήματος.",
      body: `<h2>Εισαγωγή: Η Ερώτηση που Δεν Φεύγει</h2>
<p>Υπάρχει μια ερώτηση που μας ακολουθεί. Αναδύεται στη σιωπή ανάμεσα στις υποχρεώσεις, στην ηρεμία πριν τον ύπνο. Η ερώτηση είναι εκπλητικά απλή: <strong>Γιατί;</strong></p>
<p>Ο Βίκτορ Φράνκλ, ο Βιεννέζος ψυχίατρος που επέζησε τριών χρόνων σε ναζιστικά στρατόπεδα, αφιέρωσε τη ζωή του στην απάντηση αυτής της ερώτησης — με ένα θεραπευτικό σύστημα που ονόμασε <strong>Λογοθεραπεία</strong>.</p>
<blockquote>«Αυτός που έχει ένα γιατί να ζει μπορεί να υπομείνει σχεδόν οποιοδήποτε πώς.» — Φρίντριχ Νίτσε</blockquote>

<h2>Οι Τρεις Δρόμοι προς το Νόημα</h2>
<h3>1. Δημιουργικές Αξίες</h3>
<p>Ο πρώτος δρόμος είναι μέσα από αυτό που δημιουργούμε ή συνεισφέρουμε. Δεν είναι η κλίμακα — είναι η αυθεντικότητα.</p>
<h3>2. Βιωματικές Αξίες</h3>
<p>Ο δεύτερος δρόμος είναι μέσα από την εμπειρία — ομορφιά, αλήθεια, αγάπη.</p>
<h3>3. Στάση απέναντι στη Ζωή</h3>
<p>Ακόμη και όταν δεν μπορούμε να αλλάξουμε τις συνθήκες μας, διατηρούμε την ελευθερία να επιλέξουμε τη στάση μας.</p>
<blockquote>«Όταν δεν είμαστε πλέον σε θέση να αλλάξουμε μια κατάσταση, καλούμαστε να αλλάξουμε τον εαυτό μας.» — Βίκτορ Φράνκλ</blockquote>

<h2>Επίλογος</h2>
<p>Στα Eunoia Centers προσφέρουμε έναν χώρο — ήρεμο, εμπιστευτικό, χωρίς βιασύνη — στον οποίο μπορείτε να αρχίσετε να ακούτε τι σας ζητά η δική σας ζωή.</p>
<hr>
<p><em>Αυτό το άρθρο γράφτηκε από τον Αλκίνοο, θεραπευτή στα Eunoia Centers.</em></p>`
    }
  }

  await sql`
    INSERT INTO posts (slug, author_id, cover_image, published_at, updated_at, status, tags, fallback_locale, content)
    VALUES (
      'finding-meaning-in-the-everyday',
      'a1b2c3d4-0002-0000-0000-000000000002',
      NULL,
      '2026-04-14T09:00:00.000Z',
      '2026-04-14T09:00:00.000Z',
      'published',
      ARRAY['logotherapy', 'meaning', 'Viktor Frankl', 'well-being', 'existential therapy'],
      'en',
      ${JSON.stringify(content)}
    )
    ON CONFLICT (slug) DO NOTHING
  `

  console.log('Demo post seeded.')
  await sql.end()
  console.log('Migration complete.')
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
