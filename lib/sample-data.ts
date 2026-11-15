import { ProcessResponse } from '@/types/omniclip';

export const DEMO_PRESETS: Record<string, ProcessResponse> = {
  karpathy: {
    sourceTitle: "Andrej Karpathy: Building Autonomous AI Agents & The LLM OS",
    sourceDuration: "14:32",
    sourceType: "demo",
    sourceUrl: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
    transcript: [
      { id: "seg-1", start: 0, duration: 18, timestamp: "00:00", text: "When you really think about Large Language Models, everyone treats them like chatbots. But that's like calling an iPhone just a telephone." },
      { id: "seg-2", start: 19, duration: 25, timestamp: "00:19", text: "In reality, the LLM is not a chatbot—it is the central processing unit of a completely new kind of operating system: the LLM OS." },
      { id: "seg-3", start: 45, duration: 32, timestamp: "00:45", text: "Think of context window as RAM. The context length is your working memory. Your embeddings and vector stores are your hard disk drive, your permanent storage." },
      { id: "seg-4", start: 78, duration: 28, timestamp: "01:18", text: "And tool calling—web browsing, terminal execution, Python interpreters—those are the peripheral device drivers. The mouse, the keyboard, the network card." },
      { id: "seg-5", start: 107, duration: 33, timestamp: "01:47", text: "Here is the contrarian secret: 90% of people trying to build AI agents today are over-complicating state machines. They write 2,000 lines of brittle orchestration code." },
      { id: "seg-6", start: 141, duration: 30, timestamp: "02:21", text: "What actually works in production is shockingly dumb. It is a single tight while-loop with clean schema validation and deterministic error reflection." },
      { id: "seg-7", start: 172, duration: 29, timestamp: "02:52", text: "If the model hallucinates an invalid tool argument, you don't crash. You feed the compiler error back into the prompt. The model corrects itself in 200 milliseconds." },
      { id: "seg-8", start: 202, duration: 34, timestamp: "03:22", text: "The second big breakthrough people ignore is the test-time compute revolution. Until now, we scaled models by training bigger weights with more GPU clusters." },
      { id: "seg-9", start: 237, duration: 35, timestamp: "03:57", text: "Now, you can spend 100x more compute at inference time. Letting the model search through tree of thoughts, verifying hypotheses before giving the user an answer." },
      { id: "seg-10", start: 273, duration: 31, timestamp: "04:33", text: "A 7B parameter model thinking for 30 seconds with verification will consistently beat a 70B parameter model answering in 1 second." },
      { id: "seg-11", start: 305, duration: 30, timestamp: "05:05", text: "So if you are an engineer or founder today, do not compete on pre-training. Pre-training is a commodity race for tech giants. The goldmine is in agentic workflow synthesis." },
      { id: "seg-12", start: 336, duration: 28, timestamp: "05:36", text: "The winners in the next five years will be the ones who bridge the gap between stochastic language tokens and hardened, real-world execution." }
    ],
    nuggets: [
      {
        id: "nugget-1",
        title: "The LLM OS Architecture (RAM, CPU, and Device Drivers)",
        summary: "Why treating LLMs like chatbots misses the point: it's a new Operating System where Context = RAM, Vector Stores = Disk, and Tools = Peripheral Drivers.",
        startTimestamp: "00:19",
        endTimestamp: "01:47",
        startSeconds: 19,
        endSeconds: 107,
        hookScore: 98,
        viralCategory: "Mindset Shift",
        whyItGoesViral: "Reframes a familiar concept (ChatGPT) into an architectural mental model that tech professionals and founders immediately want to share."
      },
      {
        id: "nugget-2",
        title: "The 'Shockingly Dumb' Production Agent Architecture",
        summary: "Why complex 2,000-line multi-agent orchestration frameworks fail, and why a simple while-loop with error reflection dominates in production.",
        startTimestamp: "01:47",
        endTimestamp: "03:22",
        startSeconds: 107,
        endSeconds: 202,
        hookScore: 96,
        viralCategory: "Contrarian",
        whyItGoesViral: "Contrarian counter-narrative against hyped-up multi-agent frameworks, validated by an ex-Groq / Tesla AI Director."
      },
      {
        id: "nugget-3",
        title: "Test-Time Compute: Why Smaller Models Thinking Longer Beat Giants",
        summary: "A 7B parameter model thinking for 30 seconds with verification consistently destroys a 70B model answering instantaneously.",
        startTimestamp: "03:22",
        endTimestamp: "05:36",
        startSeconds: 202,
        endSeconds: 336,
        hookScore: 94,
        viralCategory: "High-Stakes Insight",
        whyItGoesViral: "Exposes the exact inflection point of Groq's o1 and next-gen reasoning models in plain English with quantifiable proof."
      }
    ],
    assetsByNugget: {
      "nugget-1": {
        nuggetId: "nugget-1",
        tiktok: {
          title: "Stop calling ChatGPT a chatbot. Here's what it actually is.",
          hook: "Calling an LLM a chatbot is like calling an iPhone just a telephone.",
          hookVisual: "[Visual: Dramatic punch-in camera zoom. Quick flash cut between an old Nokia phone and an iPhone, text overlay in bold neon yellow: 'THE BIGGEST AI LIE']",
          bodySegments: [
            {
              dialogue: "In reality, the LLM is not a chatbot at all. It's the CPU of an entirely new operating system.",
              bRollCue: "[Visual: Sleek 3D motion graphic showing a glowing central chip labeled 'LLM CPU' pulsing with neon data streams]"
            },
            {
              dialogue: "Your context window? That is your RAM. The larger your context, the more working memory your system has active at once.",
              bRollCue: "[Visual: Split screen showing computer RAM sticks morphing into token context counters (128k -> 1M tokens)]"
            },
            {
              dialogue: "Your vector database and embeddings? That's your SSD hard drive. Permanent long-term storage.",
              bRollCue: "[Visual: High-tech holographic storage server graphic with searching laser beam]"
            },
            {
              dialogue: "And tool calling—browsers, code runners, APIs? Those are just peripheral device drivers. The mouse and keyboard for the AI brain.",
              bRollCue: "[Visual: Fast montage of code terminal, web scraper, and API endpoints plugging into the central AI core]"
            }
          ],
          cta: "Save this video. Once you view AI as an OS, your prompt engineering and system design will 10x overnight.",
          ctaVisual: "[Visual: Creator points to bottom-right bookmark button. Overlay text: 'Save for your next tech build 📌']",
          estimatedDuration: "44 seconds",
          audioVibe: "Deep synthwave / ambient cyberpunk bassline",
          caption: "If you still think ChatGPT is just a glorified chatbot, you're looking at the wrong map. The LLM OS is here. #artificialintelligence #softwareengineer #techtrends #andrejkarpathy #coding",
          hashtags: ["#AIEngineer", "#LLMOS", "#TechBreakthrough", "#SoftwareArchitecture", "#Coding"]
        },
        twitter: {
          hookTweet: "Calling an LLM a 'chatbot' is like calling the iPhone just a telephone.\n\nIn reality, we are witnessing the birth of the LLM OS.\n\nHere is Andrej Karpathy's breakdown of the computer architecture of the next decade 🧵👇 (1/5)",
          tweets: [
            {
              tweetNumber: 1,
              charCount: 221,
              tag: "The Hook",
              content: "Calling an LLM a 'chatbot' is like calling the iPhone just a telephone.\n\nIn reality, we are witnessing the birth of the LLM OS.\n\nHere is Andrej Karpathy's breakdown of the computer architecture of the next decade 🧵👇 (1/5)"
            },
            {
              tweetNumber: 2,
              charCount: 238,
              tag: "The Analogy",
              content: "1. The CPU is the LLM\n\nJust like an x86 or ARM chip processes machine code instructions, the LLM processes sequences of semantic tokens.\n\nIt isn't a conversational partner; it is a general-purpose token orchestration processor. (2/5)"
            },
            {
              tweetNumber: 3,
              charCount: 247,
              tag: "Memory & Storage",
              content: "2. Context Window = RAM\n3. Vector Stores = Hard Disk\n\nYour context window is volatile working memory. Expensive and limited, but blazing fast.\n\nVector databases and RAG are your secondary SSD storage—retrieving cold files when needed. (3/5)"
            },
            {
              tweetNumber: 4,
              charCount: 254,
              tag: "Peripheral Drivers",
              content: "4. Tool Calling = Device Drivers\n\nWhen an OS needs to print or talk to Ethernet, it calls a driver.\n\nWhen an LLM needs to calculate math or fetch real-time web data, it dispatches tool calls to interpreters, terminals, and REST endpoints. (4/5)"
            },
            {
              tweetNumber: 5,
              charCount: 232,
              tag: "Actionable Takeaway",
              content: "The Takeaway for Builders:\n\nStop building toys on top of completions. Start architecting memory management, process scheduling, and error-recovering device drivers for the LLM OS.\n\nRT if this shifted your perspective! 🚀 (5/5)"
            }
          ],
          hashtags: ["#AI", "#SoftwareArchitecture", "#TechTwitter", "#BuildInPublic"]
        },
        linkedin: {
          coverTitle: "The Death of the Chatbot: Welcome to the LLM OS",
          caption: "Most leaders still look at ChatGPT as a faster intern or a conversational search engine. Andrej Karpathy dropped a paradigm shift: Large Language Models are the CPU of an entirely new operating system. Here is the 5-slide breakdown every CTO and engineer needs to understand.",
          hashtags: ["#ArtificialIntelligence", "#SoftwareEngineering", "#Innovation", "#TechStrategy", "#CloudComputing"],
          slides: [
            {
              slideNumber: 1,
              type: "HOOK_COVER",
              header: "The Death of the Chatbot",
              subHeader: "Why treating AI as a conversational partner misses 95% of the paradigm shift.",
              bullets: [
                "Chatbots are an application layer interface",
                "Operating systems are the foundational platform",
                "Here is the modern LLM OS architecture mapped out"
              ],
              callout: "SWIPE TO SEE THE BLUEPRINT ➔"
            },
            {
              slideNumber: 2,
              type: "CORE_INSIGHT",
              header: "Component 1: The Token CPU",
              subHeader: "Language Models are semantic processors, not search engines.",
              bullets: [
                "Transforms unstructured multimodal inputs into structured execution plans",
                "Executes probabilistic reasoning across thousands of parallel domains",
                "Schedules sub-tasks just like an OS process dispatcher"
              ],
              callout: "Key Insight: The LLM is the coordinator, not the encyclopedia."
            },
            {
              slideNumber: 3,
              type: "FRAMEWORK_DIAGRAM",
              header: "Component 2: Memory Hierarchy",
              subHeader: "How LLM systems mirror traditional Von Neumann architecture.",
              bullets: [
                "⚡ Context Window = RAM (Active, high-speed working state)",
                "💾 Vector Embeddings = SSD (Semantic long-term retrieval)",
                "📁 File Systems = Structured storage (SQL, JSON, Git history)"
              ],
              callout: "Context length isn't a feature—it's your memory bandwidth."
            },
            {
              slideNumber: 4,
              type: "ACTIONABLE_STEP",
              header: "Component 3: Tool Drivers",
              subHeader: "Connecting stochastic thoughts to deterministic reality.",
              bullets: [
                "Python code interpreters for mathematical precision",
                "Headless browsers for live real-world inspection",
                "Enterprise API integrations for transaction execution"
              ],
              callout: "Without tools, an LLM is a brain in a jar. Tools give it hands."
            },
            {
              slideNumber: 5,
              type: "CTA_OUTRO",
              header: "What This Means For Your Roadmap",
              subHeader: "Where enterprise value will actually be captured in 2025-2026.",
              bullets: [
                "1. Don't compete on foundation model training",
                "2. Win on deterministic error handling & tooling",
                "3. Treat your agent system like a high-uptime OS kernel"
              ],
              callout: "Found this valuable? Repost ♻️ and follow for weekly deep dives."
            }
          ]
        }
      },
      "nugget-2": {
        nuggetId: "nugget-2",
        tiktok: {
          title: "Why 90% of AI agents fail in production",
          hook: "90% of developers building AI agents are making the exact same fatal mistake.",
          hookVisual: "[Visual: Red strobe warning alert. Quick B-roll of an engineer staring with face in hands at a wall of red error logs. Bold text: 'THE AGENT TRAP']",
          bodySegments: [
            {
              dialogue: "They write 2,000 lines of complex multi-agent state machines, graph orchestrators, and infinite recursion loops.",
              bRollCue: "[Visual: Spaghetti diagram of 15 connected boxes with confusing arrows all tangled up]"
            },
            {
              dialogue: "And what happens in the real world? One bad token breaks the state machine, and the whole system crashes.",
              bRollCue: "[Visual: Glass shattering effect with an explosion sound effect]"
            },
            {
              dialogue: "What actually works in production is shockingly dumb. It is a single tight while-loop with schema validation and self-reflection.",
              bRollCue: "[Visual: Code editor showing 15 clean lines of Python while-loop with clean green checkmarks]"
            },
            {
              dialogue: "When the model hallucinates an invalid argument, you don't crash. You feed the compiler error back into the next prompt. It self-corrects in 200ms.",
              bRollCue: "[Visual: Animated loop showing Error -> Injected to Prompt -> Model Fixes -> Output Verified]"
            }
          ],
          cta: "Drop a comment if you've been burned by over-engineered agent frameworks, and follow for clean production code.",
          ctaVisual: "[Visual: Creator smiles and taps screen. Text: 'Simplicity > Complexity ⚡']",
          estimatedDuration: "39 seconds",
          audioVibe: "Punchy lo-fi hip hop beat with clear voiceover",
          caption: "Simple architectures win in production. Stop over-engineering multi-agent state machines. #aiagents #codingtips #python #softwareengineer #techhumor",
          hashtags: ["#AIAgents", "#CodeQuality", "#CleanCode", "#SoftwareDev", "#TechTips"]
        },
        twitter: {
          hookTweet: "90% of developers building AI agents are over-engineering them to death.\n\nThey write 2,000 lines of LangChain / LangGraph spaghetti that collapses on the first edge case.\n\nHere is the 'shockingly dumb' pattern that actually wins in production 🧵👇 (1/5)",
          tweets: [
            {
              tweetNumber: 1,
              charCount: 245,
              tag: "The Hook",
              content: "90% of developers building AI agents are over-engineering them to death.\n\nThey write 2,000 lines of LangChain / LangGraph spaghetti that collapses on the first edge case.\n\nHere is the 'shockingly dumb' pattern that actually wins in production 🧵👇 (1/5)"
            },
            {
              tweetNumber: 2,
              charCount: 232,
              tag: "The Flaw",
              content: "The Multi-Agent Illusion:\n\nPeople think: 'I'll have a researcher agent, a critic agent, a writer agent, and an editor agent.'\n\nIn reality, passing context across 4 agents multiplies latency by 4x and error compounding by 10x. (2/5)"
            },
            {
              tweetNumber: 3,
              charCount: 242,
              tag: "The Solution",
              content: "The Production Pattern That Works:\n\nA single tight while-loop:\n\n1. Feed goal & system instructions\n2. Call tool with strict JSON schema\n3. Validate output deterministically\n4. If error: append error string into conversation and continue (3/5)"
            },
            {
              tweetNumber: 4,
              charCount: 228,
              tag: "Error Reflection",
              content: "Deterministic Reflection:\n\nDon't ask the LLM 'did you make a mistake?'\n\nLet the Python interpreter or Zod schema throw a real error code. Feed that raw error back. LLMs are world-class at debugging compiler messages! (4/5)"
            },
            {
              tweetNumber: 5,
              charCount: 215,
              tag: "Summary",
              content: "Rule of thumb:\n\nIf your agent framework looks like an enterprise UML diagram from 2004, you are doing it wrong.\n\nKeep it simple. Keep it deterministic. Let the model iterate.\n\nBookmark this for your next sprint! 🔖 (5/5)"
            }
          ],
          hashtags: ["#AIEngineering", "#DevCommunity", "#Python", "#Startups"]
        },
        linkedin: {
          coverTitle: "Why 90% of AI Agent Projects Fail Before Launch",
          caption: "Over the last 12 months, hundreds of teams shipped AI agents into production. Most of them silently failed due to brittle orchestration. Here is the contrarian architecture top production teams use instead.",
          hashtags: ["#AIEngineering", "#SoftwareArchitecture", "#Startups", "#TechLeadership", "#ProductDevelopment"],
          slides: [
            {
              slideNumber: 1,
              type: "HOOK_COVER",
              header: "Why 90% of AI Agents Fail",
              subHeader: "The trap of over-engineered state machines in enterprise AI.",
              bullets: [
                "Multi-agent hype vs. real-world reliability",
                "Why latency compounds exponentially",
                "The simple architecture that actually scales"
              ],
              callout: "SLIDE FOR THE BLUEPRINT ➔"
            },
            {
              slideNumber: 2,
              type: "CORE_INSIGHT",
              header: "The Compounding Error Trap",
              subHeader: "Why 4 agents are often 10x worse than 1 agent.",
              bullets: [
                "Agent A makes an 85% accurate assumption",
                "Agent B acts on that assumption (0.85 × 0.85 = 72%)",
                "Agent C outputs complete hallucination by step 3",
                "Total cost: 4x tokens, 5x latency, 0% reliability"
              ],
              callout: "Every handoff is an opportunity for entropy to enter."
            },
            {
              slideNumber: 3,
              type: "FRAMEWORK_DIAGRAM",
              header: "The Tight While-Loop Pattern",
              subHeader: "The battle-tested architectural alternative.",
              bullets: [
                "1. Unified agent prompt with unambiguous goals",
                "2. Strict JSON schema tool calling (Pydantic / Zod)",
                "3. Deterministic code sandboxing & validation",
                "4. Automated error reflection loop (max 3 retries)"
              ],
              callout: "Simple code is code you can debug at 2 AM."
            },
            {
              slideNumber: 4,
              type: "ACTIONABLE_STEP",
              header: "Deterministic Error Reflection",
              subHeader: "Turning runtime errors into prompt feedback.",
              bullets: [
                "Never write custom prompt classifiers to detect mistakes",
                "Pass actual runtime exception traces straight into the chat history",
                "Modern frontier models fix their own syntax in 1 attempt"
              ],
              callout: "Compilers are deterministic. LLMs are adaptable. Pair them."
            },
            {
              slideNumber: 5,
              type: "CTA_OUTRO",
              header: "Action Item For Engineering Leads",
              subHeader: "Audit your current agent repos this week.",
              bullets: [
                "Strip out unnecessary sub-agent intermediaries",
                "Invest in high-fidelity tool schemas and error messages",
                "Benchmark reliability across 100 deterministic test suites"
              ],
              callout: "Share with your engineering team ♻️"
            }
          ]
        }
      },
      "nugget-3": {
        nuggetId: "nugget-3",
        tiktok: {
          title: "The Test-Time Compute Revolution Explained",
          hook: "A $20 small AI model is about to beat a million-dollar supercomputer model.",
          hookVisual: "[Visual: Split screen with David vs Goliath graphic. Text: '7B MODEL VS 70B GIANT']",
          bodySegments: [
            {
              dialogue: "Until now, the only way to make an AI smarter was training it on more data with billions of dollars of GPUs.",
              bRollCue: "[Visual: Massive glowing server farm with dollar signs flying away]"
            },
            {
              dialogue: "That was pre-training compute. But now we have entered the era of test-time compute.",
              bRollCue: "[Visual: Hourglass animation showing time ticking as neural network nodes illuminate]"
            },
            {
              dialogue: "Instead of answering in 0.5 seconds, you let a lightweight 7B model search, think, and verify hypotheses for 30 seconds.",
              bRollCue: "[Visual: Tree search diagram branching out with green checks for correct paths and red X's for dead ends]"
            },
            {
              dialogue: "The result? The small model thinking longer consistently crushes the massive 70B model answering instantly.",
              bRollCue: "[Visual: Bar chart animation showing small model bar shooting past the giant model bar with trophy icon]"
            }
          ],
          cta: "Follow to stay ahead of the AI reasoning shift before everyone else catches on.",
          ctaVisual: "[Visual: Host smiles and gestures. Text overlay: 'Think deeper, not bigger 🧠']",
          estimatedDuration: "42 seconds",
          audioVibe: "Uplifting futuristic cinematic beat",
          caption: "Test-time compute changes everything. Inference thinking > massive weights. #Groq #machinelearning #futuretech #airevolution #deeplearning",
          hashtags: ["#Groq", "#TestTimeCompute", "#FutureOfAI", "#MachineLearning", "#Reasoning"]
        },
        twitter: {
          hookTweet: "A 7B model thinking for 30 seconds will beat a 70B model answering in 1 second.\n\nThis is the 'Test-Time Compute' revolution.\n\nHere is why pre-training scaling is taking a backseat to inference reasoning 🧵👇 (1/5)",
          tweets: [
            {
              tweetNumber: 1,
              charCount: 228,
              tag: "The Hook",
              content: "A 7B model thinking for 30 seconds will beat a 70B model answering in 1 second.\n\nThis is the 'Test-Time Compute' revolution.\n\nHere is why pre-training scaling is taking a backseat to inference reasoning 🧵👇 (1/5)"
            },
            {
              tweetNumber: 2,
              charCount: 235,
              tag: "Pre-Training Wall",
              content: "Phase 1 was Pre-Training Scaling:\n\n- Feed the entire public internet\n- Train for 6 months on 100,000 H100s\n- Hit diminishing returns on web text\n\nCompanies are running out of high-quality human tokens. So what's next? (2/5)"
            },
            {
              tweetNumber: 3,
              charCount: 244,
              tag: "Inference Scaling",
              content: "Phase 2 is Test-Time Compute (Inference Scaling):\n\nInstead of emitting the first token immediately, the model explores a tree of thoughts.\n\nIt generates 5 potential solutions, verifies them with internal checkers, and prunes bad branches. (3/5)"
            },
            {
              tweetNumber: 4,
              charCount: 236,
              tag: "Economics",
              content: "The Economic Moat:\n\nWhy this matters for founders:\nYou don't need a $100M cluster to compete anymore.\n\nYou can take open-weight models and build test-time verification loops, Monte Carlo tree search, and specialized verifiers. (4/5)"
            },
            {
              tweetNumber: 5,
              charCount: 219,
              tag: "Future Outlook",
              content: "In 2 years, we won't ask 'how many parameters does your model have?'\n\nWe will ask: 'how many seconds of verified compute did you allocate to solve this problem?'\n\nThe game has changed. Repost to spread the word! 🔁 (5/5)"
            }
          ],
          hashtags: ["#MachineLearning", "#AIResearch", "#Groqo1", "#TechStrategy"]
        },
        linkedin: {
          coverTitle: "The End of Parameter Wars: The Rise of Test-Time Compute",
          caption: "For 5 years, the AI narrative was simple: whoever trains on more GPUs wins. That paradigm hit a wall. Now, the battleground has shifted to inference-time reasoning. Here is the executive breakdown.",
          hashtags: ["#ArtificialIntelligence", "#TechStrategy", "#ExecutiveLeadership", "#VentureCapital", "#DeepTech"],
          slides: [
            {
              slideNumber: 1,
              type: "HOOK_COVER",
              header: "The End of Parameter Wars",
              subHeader: "Why model size is no longer the metric of intelligence.",
              bullets: [
                "The wall of pre-training web tokens",
                "The shift from static weights to active deliberation",
                "What this means for software enterprise budgets"
              ],
              callout: "THE NEW COMPUTING EQUATION ➔"
            },
            {
              slideNumber: 2,
              type: "CORE_INSIGHT",
              header: "System 1 vs. System 2 Thinking",
              subHeader: "Bringing Daniel Kahneman's cognitive psychology to neural networks.",
              bullets: [
                "GPT-4 was System 1: Instantaneous reflexive answering",
                "Reasoning models are System 2: Deliberate, self-checking thought",
                "Trading 30 seconds of compute for zero hallucinations"
              ],
              callout: "Speed is good for chat. Verification is mandatory for enterprise."
            },
            {
              slideNumber: 3,
              type: "FRAMEWORK_DIAGRAM",
              header: "The Power of Verification",
              subHeader: "Why generation is cheap but checking is high-leverage.",
              bullets: [
                "Generating 10 candidate answers costs fractions of a cent",
                "Verifying correctness via deterministic unit tests or critics",
                "Discarding 9 errors and delivering only the mathematically sound output"
              ],
              callout: "Verification transforms stochastic guesses into enterprise SLAs."
            },
            {
              slideNumber: 4,
              type: "ACTIONABLE_STEP",
              header: "The Small Model Advantage",
              subHeader: "Why high-compute inference levels the playing field.",
              bullets: [
                "Deploying edge/local 8B models with dedicated inference time",
                "Lower cloud egress costs and zero vendor lock-in",
                "Total data privacy inside private VPC clouds"
              ],
              callout: "Efficiency beats brute force in every technology cycle."
            },
            {
              slideNumber: 5,
              type: "CTA_OUTRO",
              header: "Strategic Checklist for 2025",
              subHeader: "How to reposition your tech stack today.",
              bullets: [
                "Allocate budget for test-time verification pipelines",
                "Stop benchmarking models purely on raw latency",
                "Build domain-specific verifiers for your business logic"
              ],
              callout: "Found this helpful? Share with your network ♻️"
            }
          ]
        }
      }
    }
  },
  hormozi: {
    sourceTitle: "Alex Hormozi: The $100M Value Equation Breakdown",
    sourceDuration: "12:15",
    sourceType: "demo",
    sourceUrl: "https://www.youtube.com/watch?v=sample-hormozi",
    transcript: [
      { id: "h-1", start: 0, duration: 20, timestamp: "00:00", text: "Most entrepreneurs charge based on their costs or what their competitors charge. That is the fastest route to bankruptcy." },
      { id: "h-2", start: 21, duration: 25, timestamp: "00:21", text: "Price is what you pay. Value is what you get. If you want to charge 10 times more than anyone else in your niche, you have to master the Value Equation." },
      { id: "h-3", start: 47, duration: 30, timestamp: "00:47", text: "The Value Equation has four variables. Two on top that you increase to infinity, and two on the bottom that you decrease to zero." },
      { id: "h-4", start: 78, duration: 32, timestamp: "01:18", text: "Top variable one: Dream Outcome. What is the ultimate financial, physical, or status transformation they want? Increase that." },
      { id: "h-5", start: 111, duration: 35, timestamp: "01:51", text: "Top variable two: Perceived Likelihood of Achievement. Do they actually believe YOU can get them there? Testimonials, guarantees, proof." },
      { id: "h-6", start: 147, duration: 32, timestamp: "02:27", text: "Now the magic happens on the bottom of the fraction: Time Delay and Effort & Sacrifice. This is where 99% of businesses lose." },
      { id: "h-7", start: 180, duration: 36, timestamp: "03:00", text: "If you tell someone 'I can make you fit in 3 years with 2 hours of gym every day', that is high time and high sacrifice. Value is near zero." },
      { id: "h-8", start: 217, duration: 34, timestamp: "03:37", text: "If you say 'Take this pill and you wake up with abs tomorrow', you just created a billion-dollar product because the bottom of the equation went to zero." },
      { id: "h-9", start: 252, duration: 30, timestamp: "04:12", text: "Make the result feel instantaneous and effortless. That's how you charge $10,000 for something your competitors struggle to sell for $500." }
    ],
    nuggets: [
      {
        id: "nugget-h1",
        title: "The $100M Value Equation (The 4 Variables)",
        summary: "How to charge 10x more by maximizing Dream Outcome & Perceived Likelihood while driving Time Delay and Effort to zero.",
        startTimestamp: "00:47",
        endTimestamp: "02:27",
        startSeconds: 47,
        endSeconds: 147,
        hookScore: 97,
        viralCategory: "Actionable Framework",
        whyItGoesViral: "Immediate lightbulb moment for any freelancer, agency owner, or SaaS founder struggling with pricing power."
      },
      {
        id: "nugget-h2",
        title: "The 'Magic Pill' Bottom-Half Asymmetry",
        summary: "Why reducing customer effort and time delay creates 100x more pricing leverage than just improving features.",
        startTimestamp: "02:27",
        endTimestamp: "04:12",
        startSeconds: 147,
        endSeconds: 252,
        hookScore: 95,
        viralCategory: "Contrarian",
        whyItGoesViral: "Contrarian truth that customers don't care about the hard work—they pay for the reduction of friction."
      },
      {
        id: "nugget-h3",
        title: "Why Cost-Plus Pricing Destroys Businesses",
        summary: "Pricing based on your costs or competitor rates is a race to the bottom. Price should be anchored solely to perceived outcome.",
        startTimestamp: "00:00",
        endTimestamp: "00:47",
        startSeconds: 0,
        endSeconds: 47,
        hookScore: 91,
        viralCategory: "Mindset Shift",
        whyItGoesViral: "Hits a raw nerve for struggling agency and service business owners."
      }
    ],
    assetsByNugget: {
      "nugget-h1": {
        nuggetId: "nugget-h1",
        tiktok: {
          title: "How to charge 10x your competitors with zero pushback",
          hook: "If you charge based on your hourly rate or your competitor's prices, you are guaranteeing your own failure.",
          hookVisual: "[Visual: Alex Hormozi style camera snap zoom, bold yellow text: 'THE 10X PRICING FORMULA', cash counter graphic sound effect]",
          bodySegments: [
            {
              dialogue: "Here is the exact Value Equation I used to scale our portfolio to over $100M in revenue.",
              bRollCue: "[Visual: Clean chalkboard animation writing out the fraction: (Dream Outcome × Likelihood) / (Time Delay × Effort)]"
            },
            {
              dialogue: "On top: Dream Outcome and Perceived Likelihood. Make the goal huge, and give undeniable proof you can deliver it.",
              bRollCue: "[Visual: Green arrows pointing up on the top two metrics with glowing green highlight]"
            },
            {
              dialogue: "On bottom: Time Delay and Effort & Sacrifice. Your goal is to drive these two numbers to zero.",
              bRollCue: "[Visual: Heavy red hydraulic press crushing Time Delay and Effort into dust]"
            },
            {
              dialogue: "When effort is zero and time is instant, the denominator becomes zero—and mathematically, your perceived value becomes infinite.",
              bRollCue: "[Visual: Calculator screen showing divided by zero equals INFINITY with neon sparkle effect]"
            }
          ],
          cta: "Save this blueprint right now and audit your core offer before your next sales call.",
          ctaVisual: "[Visual: Creator points to save button, text overlay: 'Audit your offer today 💰']",
          estimatedDuration: "41 seconds",
          audioVibe: "High tempo motivational bassline with crisp percussions",
          caption: "The Value Equation will fix your pricing forever. Don't sell your hours. Sell the reduction of time and effort. #alexhormozi #entrepreneurship #businessadvice #pricingstrategy #sales",
          hashtags: ["#AlexHormozi", "#ValueEquation", "#BusinessHacks", "#SalesTips", "#100MOffers"]
        },
        twitter: {
          hookTweet: "Most founders price based on cost + 20% margin.\n\nThat is how you stay broke forever.\n\nHere is Alex Hormozi's $100M Value Equation that lets you charge 10x your competitors 🧵👇 (1/5)",
          tweets: [
            {
              tweetNumber: 1,
              charCount: 219,
              tag: "The Hook",
              content: "Most founders price based on cost + 20% margin.\n\nThat is how you stay broke forever.\n\nHere is Alex Hormozi's $100M Value Equation that lets you charge 10x your competitors 🧵👇 (1/5)"
            },
            {
              tweetNumber: 2,
              charCount: 236,
              tag: "The Formula",
              content: "The Value Equation:\n\nValue = (Dream Outcome × Perceived Likelihood) ÷ (Time Delay × Effort & Sacrifice)\n\nMost people spend all their energy tweaking the top half.\n\nThe real money is in obliterating the bottom half. (2/5)"
            },
            {
              tweetNumber: 3,
              charCount: 243,
              tag: "The Top Half",
              content: "Top Half (Maximize to Infinity):\n\n1. Dream Outcome: Don't sell gym sessions, sell a 6-pack.\n2. Perceived Likelihood: Case studies, risk reversals, ironclad money-back guarantees that make saying 'no' feel foolish. (3/5)"
            },
            {
              tweetNumber: 4,
              charCount: 249,
              tag: "The Bottom Half",
              content: "Bottom Half (Minimize to Zero):\n\n3. Time Delay: Can they get a quick win in 48 hours?\n4. Effort & Sacrifice: Do you do it for them (DFY), or do they have to study 40 hours of modules?\n\nZero effort = Infinite price tag. (4/5)"
            },
            {
              tweetNumber: 5,
              charCount: 212,
              tag: "Action Step",
              content: "Summary Checklist:\n\nBefore you drop your prices, ask:\n'How can I make the result happen 2x faster with 50% less client effort?'\n\nSolve that, and you can double your fees tomorrow. 🚀 (5/5)"
            }
          ],
          hashtags: ["#Entrepreneurship", "#Pricing", "#Startups", "#SalesStrategy"]
        },
        linkedin: {
          coverTitle: "The $100M Value Equation: Masterclass in Pricing Power",
          caption: "Why can some consultants charge $50,000 for the exact same deliverable someone else struggles to sell for $2,500? It's not luck. It is the physics of value perception. Here is the 5-slide breakdown.",
          hashtags: ["#PricingStrategy", "#SalesLeadership", "#Consulting", "#BusinessGrowth", "#Entrepreneurship"],
          slides: [
            {
              slideNumber: 1,
              type: "HOOK_COVER",
              header: "The Physics of Perceived Value",
              subHeader: "How to escape commodity pricing and charge premium rates.",
              bullets: [
                "Why cost-plus pricing is financial suicide",
                "The 4 mathematical variables of consumer perception",
                "The secret lever of frictionless delivery"
              ],
              callout: "SWIPE FOR THE FORMULA ➔"
            },
            {
              slideNumber: 2,
              type: "FRAMEWORK_DIAGRAM",
              header: "Variable 1 & 2: The Multipliers",
              subHeader: "What clients consciously evaluate.",
              bullets: [
                "✨ Dream Outcome: Clear, high-status transformation",
                "🛡️ Perceived Likelihood: Concrete proof, track record, guarantees",
                "When likelihood is high, risk disappears"
              ],
              callout: "Rule: Never sell the flight; sell the tropical destination."
            },
            {
              slideNumber: 3,
              type: "CORE_INSIGHT",
              header: "Variable 3 & 4: The Friction Killers",
              subHeader: "Where enterprise valuation is truly created.",
              bullets: [
                "⏳ Time Delay: Distance between payment and first tangible ROI",
                "🏋️ Effort & Sacrifice: Pain required from the buyer",
                "As denominator approaches zero, perceived value scales to infinity"
              ],
              callout: "Convenience is the greatest moat in modern commerce."
            },
            {
              slideNumber: 4,
              type: "ACTIONABLE_STEP",
              header: "The Delivery Evolution",
              subHeader: "How to restructure your service tiers.",
              bullets: [
                "DIY (Do It Yourself): Low price, high effort, high drop-off",
                "DWY (Done With You): Medium price, shared effort",
                "DFY (Done For You): Premium price, zero buyer friction"
              ],
              callout: "Done-for-you automation command 10x-50x higher retainers."
            },
            {
              slideNumber: 5,
              type: "CTA_OUTRO",
              header: "Audit Your Offering This Quarter",
              subHeader: "Four questions to ask before raising your prices.",
              bullets: [
                "1. Can we guarantee the first milestone in under 7 days?",
                "2. What onboarding tasks can we eliminate completely?",
                "3. How do we turn our best case study into standard proof?"
              ],
              callout: "Save 📌 & Repost ♻️ for your leadership team."
            }
          ]
        }
      }
    }
  }
};
