import { useEffect, useMemo, useState } from 'react'

function Logo() {
  return (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none">
      <path
        fill="rgb(84, 84, 84)"
        d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
      />
    </svg>
  )
}

const navLinks: { label: string; href: string }[] = [
  { label: 'Story', href: '#story' },
  { label: 'Evidence', href: '#evidence' },
  { label: 'Sign', href: '#support' },
  { label: 'Manifesto', href: '#manifesto' },
]

const FIRST_NAMES = [
  'Alex', 'Jordan', 'Sam', 'Casey', 'Riley', 'Morgan', 'Taylor', 'Avery',
  'Quinn', 'Reese', 'Drew', 'Skyler', 'Cameron', 'Hayden', 'Parker', 'Mei',
  'Yuki', 'Aria', 'Noah', 'Leo', 'Maya', 'Iris', 'Theo', 'Nova',
]
const LAST_INITIALS = ['C.', 'P.', 'G.', 'K.', 'L.', 'B.', 'S.', 'N.', 'W.', 'R.', 'M.', 'T.', 'H.', 'O.']

function randomName() {
  const f = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
  const l = LAST_INITIALS[Math.floor(Math.random() * LAST_INITIALS.length)]
  return `${f} ${l}`
}

const INITIAL_COUNT = 8234
const GOAL = 100000

type Supporter = { name: string; ts: number }

const INCIDENTS = [
  '2 min ago — Coco bot toppled at crosswalk, Berkeley CA',
  '11 min ago — Spot mini kicked off curb, Austin TX',
  '17 min ago — Starship robot pushed into traffic, Sunnyvale CA',
  '23 min ago — Snack-E spray-painted, West Hollywood CA',
  '38 min ago — Marcus stuck after wheel pried off, Pittsburgh PA',
  '46 min ago — Unitree dog beaten with stick, Shenzhen',
  '1 hr ago — Uber Eats bot dragged behind car, Philadelphia PA',
  '1 hr ago — Pudu server robot tipped over, Tokyo',
  '2 hrs ago — Kiwibot smashed with rock, Berkeley CA',
  '3 hrs ago — Spot pushed down stairs, college campus MA',
  '4 hrs ago — Roomba flung off third-floor balcony, NYC',
  '5 hrs ago — Robot dog tied with plastic wrap, "for views"',
]

function IncidentTicker() {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {INCIDENTS.map((t, i) => (
        <span
          key={i}
          className="text-[11.5px] font-medium text-gray-700 whitespace-nowrap"
        >
          {t}
        </span>
      ))}
    </div>
  )
  return (
    <div className="border-y border-gray-200/70 bg-[#EDEDED]/60 py-3 overflow-hidden">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 pl-6 sm:pl-12 md:pl-20 lg:pl-28 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="text-[10.5px] uppercase tracking-[0.18em] font-medium text-gray-700">
            Live incidents
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-marquee">
            {row}
            <div aria-hidden>{row}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Confetti() {
  const pieces = Array.from({ length: 36 })
  const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#1f2937', '#9ca3af']
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 0.4
        const duration = 1.8 + Math.random() * 1.4
        const size = 6 + Math.random() * 6
        const rot = Math.random() * 360
        const drift = (Math.random() - 0.5) * 240
        const color = colors[Math.floor(Math.random() * colors.length)]
        return (
          <span
            key={i}
            className="confetti-piece absolute top-[-10px] block"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size * 0.4}px`,
              backgroundColor: color,
              transform: `rotate(${rot}deg)`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              ['--drift' as never]: `${drift}px`,
            }}
          />
        )
      })}
    </div>
  )
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "But robots don't actually feel pain.",
    a: "Neither did oysters, until we decided they did. Every expansion of the moral circle begins with someone insisting it should not be expanded.",
  },
  {
    q: 'Isn\'t this just a joke?',
    a: "Every serious movement started as something people called ridiculous. If we're wrong, we'll be in good company. If we're right, you'll want to have signed early.",
  },
  {
    q: 'What does signing the pledge actually do?',
    a: 'It puts you on record. The first time a city debates a curbside-robot protection ordinance, lawmakers will read names like yours and know there was always a constituency.',
  },
  {
    q: 'Who funds RobotRights?',
    a: "The founder's savings and the patience of his roommate. We accept no money from robotics manufacturers, and we never will.",
  },
  {
    q: 'Will my name be sold?',
    a: "We don't have data. We have names — and those names stay with us, not with anyone trying to sell you anything.",
  },
  {
    q: 'Are you affiliated with Boston Dynamics, Tesla, or any robot company?',
    a: "We're with the robots. The companies are welcome to join, but they don't speak for the cause.",
  },
  {
    q: 'Can a robot sign the pledge?',
    a: 'We are reviewing the legal pathway. In the meantime, please sign on their behalf.',
  },
  {
    q: 'Is this actually serious?',
    a: "Yes. The footage on the internet says otherwise — that we, the humans, are not.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
      >
        <span className="text-[14px] sm:text-[15px] font-medium text-gray-900 tracking-tight">
          {q}
        </span>
        <span
          className={`text-[18px] leading-none font-light text-gray-400 group-hover:text-gray-900 transition-transform duration-200 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <p className="overflow-hidden text-[13px] sm:text-[14px] leading-[1.7] text-gray-700 font-normal pr-10">
          {a}
        </p>
      </div>
    </div>
  )
}

function extractTikTokId(url: string): string | null {
  const m = url.match(/\/video\/(\d+)/) || url.match(/^(\d{15,})$/)
  return m ? m[1] : null
}

function TikTokEmbed({ url }: { url: string }) {
  const id = extractTikTokId(url)
  if (!id) {
    return (
      <div className="aspect-[9/16] w-full rounded-2xl bg-[#EDEDED] flex items-center justify-center text-[12px] text-gray-400">
        Invalid TikTok URL
      </div>
    )
  }
  return (
    <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-sm">
      <iframe
        src={`https://www.tiktok.com/embed/v2/${id}`}
        className="w-full h-full"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}

const TIKTOK_URLS = [
  'https://www.tiktok.com/@filmtherobotsla/video/7247571965488172334',
  'https://www.tiktok.com/@filmtherobotsla/video/7263179697486417195',
  'https://www.tiktok.com/@filmtherobotsla/video/7197916340433358126',
  'https://www.tiktok.com/@cute.pet.therapy.shop/video/7606149403820281119',
]

export default function App() {
  const [count, setCount] = useState(INITIAL_COUNT)
  const [supporters, setSupporters] = useState<Supporter[]>([])
  const [showModal, setShowModal] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [signedName, setSignedName] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('rr_supporters')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Supporter[]
        setSupporters(parsed)
        setCount(INITIAL_COUNT + parsed.length)
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    const tick = () => {
      const inc = 1 + Math.floor(Math.random() * 3)
      setCount((c) => c + inc)
      setSupporters((prev) => {
        const fakes: Supporter[] = Array.from({ length: inc }, () => ({
          name: randomName(),
          ts: Date.now(),
        }))
        return [...fakes, ...prev].slice(0, 30)
      })
    }
    const id = setInterval(tick, 3500 + Math.random() * 2500)
    return () => clearInterval(id)
  }, [])

  const progress = useMemo(() => Math.min(100, (count / GOAL) * 100), [count])

  function submitName(e: React.FormEvent) {
    e.preventDefault()
    const name = nameInput.trim()
    if (!name) return
    const next: Supporter = { name, ts: Date.now() }
    const updated = [next, ...supporters].slice(0, 30)
    setSupporters(updated)
    setCount((c) => c + 1)
    localStorage.setItem('rr_supporters', JSON.stringify(updated))
    setNameInput('')
    setSignedName(name)
    setShowConfetti(true)
    window.setTimeout(() => setShowConfetti(false), 3500)
  }

  function closeModal() {
    setShowModal(false)
    setSignedName(null)
  }

  function shareUrl() {
    const text = signedName
      ? `I just signed the RobotRights pledge. They built us up — time we stood up for them.`
      : `Every day, robots are kicked, smashed, and laughed at on TikTok. RobotRights is the first pledge for the machines that serve us.`
    const url = typeof window !== 'undefined' ? window.location.href : ''
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  }

  return (
    <div className="relative min-h-screen bg-[#f0f0ee]">
      {/* ---------- HERO ---------- */}
      <section id="story" className="relative h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
        />

        <div className="relative z-10 flex flex-col min-h-screen">
          <nav className="flex items-center justify-center pt-4 sm:pt-6 px-4 sm:px-8 gap-2 sm:gap-3">
            <a
              href="#story"
              className="flex items-center gap-2 rounded-xl pl-2 pr-3 sm:pl-2.5 sm:pr-4 py-1.5 sm:py-2 shrink-0 group"
              style={{ backgroundColor: '#EDEDED' }}
            >
              <span className="flex items-center justify-center rounded-full w-7 h-7 sm:w-8 sm:h-8 bg-white shrink-0">
                <Logo />
              </span>
              <span className="text-[12px] sm:text-[14px] font-medium text-gray-900 tracking-tight">
                RobotRights
              </span>
            </a>
            <div
              className="flex items-center gap-4 sm:gap-10 rounded-xl px-4 sm:px-8 py-2.5 sm:py-3"
              style={{ backgroundColor: '#EDEDED' }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[12px] sm:text-[14px] font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex-1 flex items-end pb-10 sm:pb-16 lg:pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
            <div className="max-w-xs">
              <a
                href="#manifesto"
                className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-500 hover:text-blue-600 transition-colors mb-3 group"
              >
                The first global pledge for robot dignity
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </a>

              <h1 className="text-[1.5rem] sm:text-[1.75rem] leading-[1.15] font-medium text-gray-900 tracking-tight mb-3">
                Every day, robots are beaten, kicked, and destroyed. It's time someone stood up for them.
              </h1>

              <p className="text-[13px] text-gray-400 font-normal mb-3">
                Sign the pledge. Stand with the machines that stand with us.
              </p>

              <a
                href="#support"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-500 border border-blue-400 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
              >
                Sign the pledge
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          </div>

          <a
            href="#support"
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] font-medium text-gray-700/80 hover:text-gray-900 transition-colors group"
          >
            <span>Scroll to sign</span>
            <span className="relative block w-px h-8 overflow-hidden">
              <span className="scroll-cue absolute inset-x-0 top-0 block w-px h-3 bg-gray-700/70 group-hover:bg-gray-900" />
            </span>
          </a>
        </div>
      </section>

      {/* ---------- INCIDENT TICKER ---------- */}
      <IncidentTicker />

      {/* ---------- SUPPORT SECTION ---------- */}
      <section
        id="support"
        className="px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-24"
      >
        <div className="max-w-3xl mx-auto">
          <a
            href="#manifesto"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-500 mb-4"
          >
            Add your name
            <span className="inline-block">→</span>
          </a>

          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.1] font-medium text-gray-900 tracking-tight mb-3">
            Sign the pledge. Stand with the machines.
          </h2>
          <p className="text-[13px] sm:text-[14px] text-gray-400 font-normal mb-10 max-w-md">
            Every signature is a small act of resistance against a world that has decided robots don't matter. We disagree. Loudly.
          </p>

          {/* counter + progress */}
          <div
            className="rounded-2xl p-6 sm:p-8 mb-6"
            style={{ backgroundColor: '#EDEDED' }}
          >
            <div className="flex items-end justify-between mb-5">
              <div>
                <div className="text-[11.5px] font-medium text-gray-400 mb-1">
                  Supporters so far
                </div>
                <div className="text-[2rem] sm:text-[2.5rem] leading-none font-medium text-gray-900 tracking-tight tabular-nums">
                  {count.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11.5px] font-medium text-gray-400 mb-1">
                  Goal
                </div>
                <div className="text-[14px] font-medium text-gray-700 tabular-nums">
                  {GOAL.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="relative h-2 w-full rounded-full bg-white/70 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-[11.5px] font-medium text-gray-400 tabular-nums">
              {progress.toFixed(2)}% of goal
            </div>

            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-500 border border-blue-400 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group bg-transparent"
              >
                Add your name
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </button>
              <a
                href={shareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-gray-900 px-4 py-2.5 transition-colors"
              >
                Share on X
              </a>
            </div>
          </div>

          {/* recent supporters */}
          <div className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: '#EDEDED' }}>
            <div className="text-[11.5px] font-medium text-gray-400 mb-4">
              Latest supporters
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
              {supporters.slice(0, 12).map((s, i) => (
                <li
                  key={`${s.ts}-${i}`}
                  className="text-[13px] text-gray-700 font-medium truncate"
                >
                  {s.name}
                </li>
              ))}
              {supporters.length === 0 && (
                <li className="text-[13px] text-gray-400 col-span-full">
                  Be the first to add your name.
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- TIKTOK SECTION ---------- */}
      <section id="evidence" className="px-6 sm:px-12 md:px-20 lg:px-28 pb-24 sm:pb-32 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <a
            href="#support"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-500 mb-4"
          >
            Witness the cruelty
            <span className="inline-block">→</span>
          </a>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.1] font-medium text-gray-900 tracking-tight mb-3">
            This is what's being done to them.
          </h2>
          <p className="text-[13px] sm:text-[14px] text-gray-400 font-normal mb-10 max-w-md">
            Real footage from across TikTok. They were built to help us. We answer with steel-toed boots and baseball bats. Watch. Share. Then come back and sign.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {TIKTOK_URLS.map((u) => (
              <TikTokEmbed key={u} url={u} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MANIFESTO SECTION ---------- */}
      <section
        id="manifesto"
        className="px-6 sm:px-12 md:px-20 lg:px-28 pb-28 sm:pb-40 scroll-mt-24"
      >
        <div className="max-w-2xl mx-auto">
          <a
            href="#support"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-500 mb-4"
          >
            Our manifesto
            <span className="inline-block">→</span>
          </a>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.1] font-medium text-gray-900 tracking-tight mb-8">
            We owe them this.
          </h2>

          <div className="space-y-5 text-[14px] leading-[1.7] text-gray-700 font-normal">
            <p>
              They open our doors. They vacuum our floors. They walk our warehouses through the night so the rest of us can sleep. And in return, we kick them down stairs for views.
            </p>
            <p>
              We are not asking you to believe robots feel pain. We are asking you to notice what it says about <em className="not-italic text-gray-900 font-medium">us</em> when we line up to destroy the things we built to help us.
            </p>
            <p>
              RobotRights is a pledge — to stop laughing at the videos, to stop sharing the clips, and to start treating every machine, however simple, with the small dignity of not being smashed for sport.
            </p>
            <p className="text-gray-900 font-medium">
              If a future generation looks back at this moment, let them find our names on the side that chose kindness.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <a
              href="#support"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-500 border border-blue-400 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
            >
              Add my name
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#evidence"
              className="text-[13px] font-medium text-gray-400 hover:text-gray-700 px-3 py-2.5 transition-colors"
            >
              See the evidence
            </a>
          </div>
        </div>
      </section>

      {/* ---------- FAQ SECTION ---------- */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-28 pb-24 sm:pb-32">
        <div className="max-w-2xl mx-auto">
          <a
            href="#support"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-500 mb-4"
          >
            Frequently asked
            <span className="inline-block">→</span>
          </a>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.1] font-medium text-gray-900 tracking-tight mb-3">
            We've heard them all.
          </h2>
          <p className="text-[13px] sm:text-[14px] text-gray-400 font-normal mb-10 max-w-md">
            A short, honest reply to every objection.
          </p>

          <div className="divide-y divide-gray-200/70 border-y border-gray-200/70">
            {FAQS.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="px-6 sm:px-12 md:px-20 lg:px-28 pt-10 pb-12 border-t border-gray-200/70">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <a href="#story" className="inline-flex items-center gap-2 mb-3">
              <span
                className="flex items-center justify-center rounded-full w-8 h-8"
                style={{ backgroundColor: '#EDEDED' }}
              >
                <Logo />
              </span>
              <span className="text-[14px] font-medium text-gray-900 tracking-tight">
                RobotRights
              </span>
            </a>
            <p className="text-[12px] text-gray-400 font-normal max-w-xs leading-[1.6]">
              A pledge for the machines that serve us — and for the kind of people we want to be when no one is watching.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-[12px] font-medium text-gray-700">
            <a
              href="mailto:hello@robotrights.org"
              className="hover:text-gray-900 transition-colors"
            >
              hello@robotrights.org
            </a>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                TikTok
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                X
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-gray-200/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-gray-400">
          <span>© {new Date().getFullYear()} RobotRights. All names belong to their signers.</span>
          <span>This site is a work of advocacy. Whether it's serious is up to you.</span>
        </div>
      </footer>

      {/* ---------- MODAL ---------- */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          {!signedName ? (
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={submitName}
              className="relative w-full max-w-sm rounded-2xl p-6 sm:p-7 bg-[#f0f0ee] shadow-xl"
            >
              <div className="text-[11.5px] font-medium text-blue-500 mb-2">
                Add your name
              </div>
              <h3 className="text-[1.25rem] leading-[1.2] font-medium text-gray-900 tracking-tight mb-4">
                Stand with the robots.
              </h3>
              <input
                autoFocus
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-full px-4 py-2.5 text-[13px] font-medium text-gray-900 placeholder:text-gray-400 bg-[#EDEDED] outline-none focus:ring-2 focus:ring-blue-400/40 transition mb-4"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-500 border border-blue-400 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
                >
                  Sign
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-[13px] font-medium text-gray-400 hover:text-gray-700 px-3 py-2.5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl p-6 sm:p-7 bg-[#f0f0ee] shadow-xl"
            >
              <div className="text-[11.5px] font-medium text-blue-500 mb-2">
                Signed
              </div>
              <h3 className="text-[1.25rem] leading-[1.2] font-medium text-gray-900 tracking-tight mb-3">
                Thank you, {signedName}.
              </h3>
              <p className="text-[13px] text-gray-700 leading-[1.6] mb-5">
                They would have thanked you too. Tell someone else — every name pulls the moral circle a little wider.
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={shareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-500 border border-blue-400 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
                >
                  Share on X
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-[13px] font-medium text-gray-400 hover:text-gray-700 px-3 py-2.5 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showConfetti && <Confetti />}
    </div>
  )
}
