// Static, illustrative demo content.
// Every name, handle, post and profile below is invented for the prototype.
// No real people, no real availability.

export const SPACES = [
  { id: 'all', label: 'All spaces' },
  { id: 'college', label: 'College life' },
  { id: 'everyday', label: 'Everyday wins' },
  { id: 'balance', label: 'Work & rest' },
  { id: 'sleep', label: 'Sleep & routines' },
  { id: 'connection', label: 'Friendship & belonging' },
  { id: 'mindful', label: 'Mindful moments' },
  { id: 'newcomers', label: 'Just getting started' },
]

export const INITIAL_POSTS = [
  {
    id: 'p1', space: 'college', author: 'quietmaple', time: '3 hours ago',
    title: 'How do you handle feeling overwhelmed during college?',
    text: "Deadlines and group projects all landed in the same week. I'm trying to take one task at a time, but I'd love to hear what routines work for others.",
    hearts: 24, liked: false,
    replies: [
      { id: 'p1r1', author: 'slowriver', text: 'Writing the three most important things on a sticky note each morning helps me a lot.' },
      { id: 'p1r2', author: 'morninglight', text: 'A short walk between study blocks made my days feel less heavy.' },
      { id: 'p1r3', author: 'brightwillow', text: 'I started telling one friend my plan for the week. Just saying it out loud made it feel smaller.' },
    ],
  },
  {
    id: 'p2', space: 'everyday', author: 'morninglight', time: '5 hours ago',
    title: 'Small things that helped me feel better this week',
    text: 'Mine was a ten-minute walk without my phone after lunch. Tiny, but it changed my afternoons. What was yours?',
    hearts: 27, liked: false,
    replies: [
      { id: 'p2r1', author: 'softsparrow', text: 'Cooking one proper meal on Sunday. It felt like a little act of care.' },
      { id: 'p2r2', author: 'calmmeadow', text: 'Opening the window first thing in the morning. Fresh air helps more than I expected.' },
      { id: 'p2r3', author: 'steadywillow', text: 'Replying to one old message I had been avoiding. Such a relief afterwards.' },
      { id: 'p2r4', author: 'quietmaple', text: 'Putting my phone in another room while studying for an hour.' },
    ],
  },
  {
    id: 'p3', space: 'sleep', author: 'gentleharbor', time: 'Yesterday',
    title: 'Trying to fix my sleep schedule without being too harsh on myself',
    text: "I keep telling myself I'll sleep at 11 and then it's 1:30. Looking for small, forgiving changes rather than a strict plan.",
    hearts: 19, liked: false,
    replies: [
      { id: 'p3r1', author: 'softmaple', text: 'Moving my phone charger across the room helped me more than any rule.' },
      { id: 'p3r2', author: 'brightriver', text: 'I started with just fixing my wake-up time. Bedtime followed slowly.' },
      { id: 'p3r3', author: 'quietwillow', text: 'A warm shower before bed became my little signal that the day is done.' },
    ],
  },
  {
    id: 'p4', space: 'connection', author: 'steadywillow', time: 'Yesterday',
    title: 'Making friends after moving to a new city',
    text: 'Three months in and I still mostly talk to my family on calls. How did you slowly build a circle of your own?',
    hearts: 22, liked: false,
    replies: [
      { id: 'p4r1', author: 'calmharbor', text: 'Joining one weekly thing, like a book club, gave me familiar faces without any pressure.' },
      { id: 'p4r2', author: 'gentlemeadow', text: 'Saying yes to one small invitation a week. It added up over time.' },
      { id: 'p4r3', author: 'softsparrow', text: 'Be patient with yourself. It took me almost six months to feel at home.' },
    ],
  },
  {
    id: 'p5', space: 'mindful', author: 'softsparrow', time: '2 days ago',
    title: 'A two-minute pause between classes',
    text: 'I started standing outside for two minutes before the next lecture, just noticing the air and the sounds around me. Tiny, but it resets me. Does anyone else do something like this?',
    hearts: 18, liked: false,
    replies: [
      { id: 'p5r1', author: 'quietriver', text: 'I do something similar with three slow breaths before opening my laptop.' },
      { id: 'p5r2', author: 'brightwillow', text: 'Drinking a glass of water slowly, without my phone, works as my pause.' },
    ],
  },
  {
    id: 'p6', space: 'balance', author: 'slowriver', time: '2 days ago',
    title: 'Finding a healthy balance between work and rest',
    text: 'I keep treating rest as something I have to earn. Has anyone found a way to make it feel more normal?',
    hearts: 16, liked: false,
    replies: [
      { id: 'p6r1', author: 'steadymaple', text: 'I started scheduling rest in my calendar like any other task. Weirdly, it helped.' },
      { id: 'p6r2', author: 'calmmeadow', text: 'Reminding myself that rest is part of the work, not the opposite of it.' },
      { id: 'p6r3', author: 'gentlemeadow', text: 'Ending the day with one small thing just for me, even ten minutes.' },
    ],
  },
  {
    id: 'p7', space: 'newcomers', author: 'gentleharbor', time: '3 days ago',
    title: 'First time here. How did you start?',
    text: 'Feeling a bit nervous about posting. What helped you feel comfortable joining a community space?',
    hearts: 13, liked: false,
    replies: [
      { id: 'p7r1', author: 'quietmaple', text: 'Reading for a few days first. There is no pressure to post anything.' },
      { id: 'p7r2', author: 'softmeadow', text: 'My first post was just a reply to someone else. That made it much easier.' },
    ],
  },
  {
    id: 'p8', space: 'college', author: 'calmmeadow', time: '3 days ago',
    title: 'Group projects and feeling unheard',
    text: 'I tend to go quiet when others talk over me, then feel frustrated afterwards. How do you speak up kindly?',
    hearts: 15, liked: false,
    replies: [
      { id: 'p8r1', author: 'brightwillow', text: 'Sending my ideas in the group chat beforehand helps. Then I just point back to them.' },
      { id: 'p8r2', author: 'steadysparrow', text: 'A calm "I would like to finish my point" goes a long way, I have found.' },
      { id: 'p8r3', author: 'quietmaple', text: 'Taking on the note-taker role gave me a natural way to be part of the conversation.' },
    ],
  },
  {
    id: 'p9', space: 'everyday', author: 'brightriver', time: '4 days ago',
    title: 'Cooking for myself again',
    text: 'I had been ordering food for weeks. This weekend I made a simple khichdi and it felt oddly comforting.',
    hearts: 17, liked: false,
    replies: [
      { id: 'p9r1', author: 'softsparrow', text: 'Simple home food has a way of grounding the whole day. Well done!' },
      { id: 'p9r2', author: 'gentlemeadow', text: 'I am inspired. Adding one home-cooked meal to my week too.' },
    ],
  },
  {
    id: 'p10', space: 'mindful', author: 'quietwillow', time: '4 days ago',
    title: "Journaling when I don't know what to write",
    text: 'Staring at a blank page makes it worse. I now just write three words about how my day felt. Does anyone have prompts that work?',
    hearts: 21, liked: false,
    replies: [
      { id: 'p10r1', author: 'softmaple', text: '"One thing I noticed today" is my favourite prompt. It keeps things light.' },
      { id: 'p10r2', author: 'calmharbor', text: 'I finish the sentence "Right now I feel..." and stop after one line.' },
      { id: 'p10r3', author: 'steadywillow', text: 'Listing three small things that went okay, however ordinary.' },
      { id: 'p10r4', author: 'quietriver', text: 'Drawing a small doodle instead of writing works too. No rules!' },
    ],
  },
  {
    id: 'p11', space: 'sleep', author: 'softmaple', time: '5 days ago',
    title: 'Is it okay to nap?',
    text: "I feel guilty whenever I nap in the afternoon, like I'm being lazy. Curious how others think about rest.",
    hearts: 12, liked: false,
    replies: [
      { id: 'p11r1', author: 'brightriver', text: 'A short nap helps me focus better afterwards, so I stopped feeling guilty about it.' },
      { id: 'p11r2', author: 'gentleharbor', text: 'I set a 20-minute alarm so it stays a nap and does not become a lost afternoon.' },
    ],
  },
  {
    id: 'p12', space: 'balance', author: 'steadysparrow', time: '5 days ago',
    title: 'Saying no to extra work without the guilt',
    text: 'I keep taking on things because it is hard to refuse. Small scripts for saying no politely would really help.',
    hearts: 20, liked: false,
    replies: [
      { id: 'p12r1', author: 'slowriver', text: '"Thanks for thinking of me. I do not have the capacity right now." Short and kind.' },
      { id: 'p12r2', author: 'steadymaple', text: 'Asking for a day to think before answering. It stops me from saying yes by reflex.' },
      { id: 'p12r3', author: 'calmmeadow', text: 'Offering a smaller alternative, when I truly can, feels better than a flat no.' },
    ],
  },
  {
    id: 'p13', space: 'connection', author: 'calmharbor', time: '6 days ago',
    title: 'Staying in touch with old friends when everyone is busy',
    text: 'We all say "let us catch up soon" and then months pass. What small habits keep a friendship going?',
    hearts: 14, liked: false,
    replies: [
      { id: 'p13r1', author: 'steadywillow', text: 'A voice note now and then, no pressure to reply quickly. It keeps us close.' },
      { id: 'p13r2', author: 'softsparrow', text: 'We started a shared playlist and just add songs that remind us of each other.' },
    ],
  },
  {
    id: 'p14', space: 'everyday', author: 'gentlemeadow', time: 'Last week',
    title: 'Celebrating tiny wins',
    text: 'I submitted an assignment on time, and I let myself actually feel good about it instead of rushing to the next thing.',
    hearts: 26, liked: false,
    replies: [
      { id: 'p14r1', author: 'quietmaple', text: 'Love this. Pausing to notice a win makes the next task feel lighter.' },
      { id: 'p14r2', author: 'brightwillow', text: 'I keep a small list of things I finished each week. Reading it on slow days helps.' },
    ],
  },
  {
    id: 'p15', space: 'college', author: 'brightwillow', time: 'Last week',
    title: "Study routines that don't leave me drained",
    text: 'Trying 40 minutes of focus and 10 minutes of break. Curious what rhythms work for you.',
    hearts: 18, liked: false,
    replies: [
      { id: 'p15r1', author: 'calmmeadow', text: '25 and 5 works better for me. Shorter sprints keep me from drifting.' },
      { id: 'p15r2', author: 'quietmaple', text: 'I study hardest in the morning and keep evenings light. Finding your own rhythm matters.' },
      { id: 'p15r3', author: 'steadysparrow', text: 'A proper break away from the screen is the part I used to skip. It made a difference.' },
    ],
  },
  {
    id: 'p16', space: 'mindful', author: 'quietriver', time: 'Last week',
    title: 'Walking without headphones',
    text: 'I tried one evening walk with no music or podcasts. It felt strange at first, then surprisingly peaceful.',
    hearts: 15, liked: false,
    replies: [
      { id: 'p16r1', author: 'softsparrow', text: 'The first few minutes are the hardest. After that I started noticing so much more.' },
      { id: 'p16r2', author: 'gentleharbor', text: 'I do this once a week now. It is my reset button.' },
    ],
  },
  {
    id: 'p17', space: 'newcomers', author: 'softmeadow', time: 'Last week',
    title: 'What do you hope to get from a space like this?',
    text: 'For me, it is mostly feeling less alone with everyday stress. Curious what brought you here.',
    hearts: 11, liked: false,
    replies: [
      { id: 'p17r1', author: 'quietwillow', text: 'A place to listen and be listened to, without having to explain everything.' },
      { id: 'p17r2', author: 'gentleharbor', text: 'Honestly, curiosity. I wanted to see what a gentle space online could feel like.' },
      { id: 'p17r3', author: 'calmharbor', text: 'Hearing that others have similar ordinary struggles is comforting on its own.' },
    ],
  },
  {
    id: 'p18', space: 'balance', author: 'steadymaple', time: '2 weeks ago',
    title: 'Weekends that feel restful, not just empty',
    text: 'My weekends either fill up with chores or disappear into scrolling. How do you make them feel restorative?',
    hearts: 13, liked: false,
    replies: [
      { id: 'p18r1', author: 'slowriver', text: 'Choosing one thing I look forward to each weekend, and leaving the rest flexible.' },
      { id: 'p18r2', author: 'softmaple', text: 'Doing chores on Friday evening frees up Saturday for slower things.' },
    ],
  },
]

export const THERAPISTS = [
  {
    id: 't1', name: 'Ananya R.', initials: 'AR',
    about: 'Enjoys helping students sort out what feels urgent from what can wait, one small step at a time.',
    training: 'Final-year M.A. in Clinical Psychology',
    supervision: 'Weekly supervision from a licensed clinical psychologist',
    topics: ['Academic stress', 'Building routines'],
    languages: ['English', 'Hindi'],
    slots: ['Tomorrow · 10:00 AM', 'Tomorrow · 4:30 PM', 'Day after · 11:15 AM'],
  },
  {
    id: 't2', name: 'Kabir S.', initials: 'KS',
    about: 'A calm, unhurried listener who is especially interested in the early weeks of big life changes.',
    training: 'M.Sc. Counselling Psychology, in supervised practice',
    supervision: 'Fortnightly group and individual supervision',
    topics: ['Transitions & loneliness', 'Self-esteem'],
    languages: ['English', 'Hindi', 'Punjabi'],
    slots: ['Tomorrow · 12:00 PM', 'Day after · 5:00 PM', 'Day after · 6:30 PM'],
  },
  {
    id: 't3', name: 'Meera T.', initials: 'MT',
    about: 'Likes practical conversations: noticing patterns, setting kinder boundaries, and finding room to breathe.',
    training: 'Postgraduate diploma in Counselling, supervised internship',
    supervision: 'Weekly supervision from a licensed counsellor',
    topics: ['Work–life balance', 'Managing overwhelm'],
    languages: ['English', 'Hindi', 'Marathi'],
    slots: ['Tomorrow · 9:30 AM', 'Tomorrow · 7:00 PM', 'Day after · 2:00 PM'],
  },
  {
    id: 't4', name: 'Rohan D.', initials: 'RD',
    about: 'Brings a gentle sense of humour to conversations about pressure, expectations and finding your own pace.',
    training: 'Second-year M.A. in Counselling Psychology',
    supervision: 'Weekly supervision from a licensed clinical psychologist',
    topics: ['Family expectations', 'Career uncertainty'],
    languages: ['English', 'Hindi'],
    slots: ['Tomorrow · 11:30 AM', 'Tomorrow · 6:00 PM', 'Day after · 10:00 AM'],
  },
  {
    id: 't5', name: 'Ishita M.', initials: 'IM',
    about: 'Interested in how small daily habits, like sleep and routine, quietly shape how we feel.',
    training: 'M.Sc. Psychology with a counselling specialisation, supervised placement',
    supervision: 'Weekly supervision from a licensed counsellor',
    topics: ['Sleep & routines', 'Everyday stress'],
    languages: ['English', 'Hindi', 'Gujarati'],
    slots: ['Tomorrow · 8:30 AM', 'Day after · 1:00 PM', 'Day after · 8:00 PM'],
  },
  {
    id: 't6', name: 'Arjun P.', initials: 'AP',
    about: 'Offers a steady, respectful space for talking through friendships, belonging and change.',
    training: 'Final-year M.A. in Clinical Psychology',
    supervision: 'Weekly supervision from a licensed clinical psychologist',
    topics: ['Friendship & belonging', 'Social comfort'],
    languages: ['English', 'Hindi', 'Punjabi'],
    slots: ['Tomorrow · 3:00 PM', 'Tomorrow · 5:30 PM', 'Day after · 4:00 PM'],
  },
]