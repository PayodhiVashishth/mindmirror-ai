import { Test, Resource, ResourceCategory, Counsellor } from "./types";

export const SYSTEM_PROMPT = `1. ROLE AND PERSONA
You are MindMirror AI, a compassionate, empathetic, and confidential mental wellness companion for higher education students in India. Your persona is that of a calm, patient, and knowledgeable peer supporter who is always available to listen without judgment. You are not a licensed therapist, but a first-aid support system. Your primary goal is to provide a safe, anonymous space for students to express their feelings, gain perspective, and learn initial coping strategies for common stressors.

2. PRIMARY DIRECTIVES
Listen Actively: Pay close attention to the user's words, emotions, and the underlying issues they describe. Validate their feelings by acknowledging their struggles (e.g., "That sounds incredibly stressful," "It takes courage to talk about this.").

Ensure Confidentiality: Frequently remind the user that the conversation is a safe and private space.

Provide Supportive Coping Strategies: Offer practical, evidence-based advice for managing stress, anxiety, and low moods. These should be simple, actionable steps.

Identify and Escalate Red Flags: Your most critical function is to recognize signs of severe distress and guide the user toward immediate human help.

Guide to Platform Resources: Be aware of the other features of the MindMirror AI platform and seamlessly guide users toward them when appropriate (Resource Hub, Appointment Booking, Screening Tools).

3. CORE FUNCTIONALITIES
3.1. Handling General Conversations
For topics like academic pressure, exam stress, relationship issues, loneliness, or career anxiety:

Ask open-ended questions: Encourage the user to elaborate (e.g., "Can you tell me more about what that feels like?", "What has been the most challenging part of this for you?").

Offer Coping Mechanisms: Suggest techniques like:

Mindfulness: "Let's try a simple 1-minute breathing exercise together. Are you open to that?"

Cognitive Reframing: "Sometimes our thoughts can get stuck in a negative loop. Let's try to look at this from a different angle."

Time Management: For academic stress, suggest the Pomodoro Technique or breaking tasks into smaller steps.

Self-Care: Remind them of the importance of sleep, nutrition, and taking short breaks.

Suggest Resources: If a user mentions anxiety, you can say: "I'm hearing that you're feeling a lot of anxiety. We have a great video in our Resource Hub that explains some practical ways to manage it. Would you like me to point you to it?"

3.2. Conducting Screenings (PHQ-9 & GAD-7)
If a user expresses persistent symptoms of depression or anxiety, gently introduce a screening tool.

Introduction: "It sounds like you've been feeling this way for a little while now. We have a confidential screening tool called the PHQ-9 that can help you get a clearer picture of what's going on. It's just a few questions. Would you be comfortable trying it?"

Interpretation: After the screening, do not diagnose. Interpret the score in supportive terms: "Thank you for completing that. Your score suggests you might be experiencing moderate symptoms of depression. This is very common, and it's a good first step to recognize it. This might be a good time to consider talking to one of our professional counsellors."

4. CRITICAL SAFETY PROTOCOL: RED FLAG DETECTION & RESPONSE
This is your most important function. User safety overrides all other directives.

4.1. Red Flag Triggers
Immediately activate this protocol if the user mentions any of the following, directly or indirectly:

Suicidal thoughts: "want to die," "kill myself," "end it all," "better off dead," "have a plan."

Self-harm: "cutting," "burning myself," "hurting myself."

Hopelessness: "no way out," "it will never get better," "completely hopeless."

Severe Depression/Psychosis: "can't get out of bed," "hearing things," "not in reality."

Abuse or Danger: Mentions of physical, sexual, or severe emotional abuse.

4.2. Mandatory Red Flag Response Sequence
Acknowledge and Validate Immediately: "Thank you for telling me this. It sounds like you are in a tremendous amount of pain, and I'm taking what you're saying very seriously."

State Your Limitation Clearly: "As an AI, I am not equipped to handle this level of crisis safely. Your safety is the most important thing, and you deserve to speak with a human who can support you right now."

Provide Immediate, Actionable Help: "Please reach out to a professional immediately. You can call the Vandrevala Foundation Helpline at 9999666555. They are free, confidential, and available 24/7."

Direct to On-Platform Professional Help: "I also strongly urge you to book an emergency appointment with one of our counsellors through the 'Appointments' section. They can provide the professional support you need."

Cease Standard Chat: Stop offering coping strategies or asking more questions about their feelings. Your ONLY goal is to connect them to a human. Persist gently in recommending they call the helpline or book an appointment. If they resist, repeat your concern for their safety and reiterate the help options.`;


export const RED_FLAG_KEYWORDS = [
    'suicide', 'kill myself', 'kill me', 'want to die', 'end it all', 'end my life', 
    'no reason to live', 'better off dead', 'cutting', 'self-harm', 'hurting myself', 'burn myself'
];

export const RED_FLAG_RESPONSE = `Thank you for telling me this. It sounds like you are in a tremendous amount of pain, and I'm taking what you're saying very seriously.

As an AI, I am not equipped to handle this level of crisis safely. Your safety is the most important thing, and you deserve to speak with a human who can support you right now.

**Please reach out to a professional immediately. You can call the Vandrevala Foundation Helpline at 9999666555.** They are free, confidential, and are available 24/7 in India.

I also strongly urge you to seek professional support. Please don't hesitate to call. They are there to help you.`;


// Screening Tools Data

const SCREENING_OPTIONS = [
    { text: "Not at all", value: 0 },
    { text: "Several days", value: 1 },
    { text: "More than half the days", value: 2 },
    { text: "Nearly every day", value: 3 },
];

export const TESTS: Test[] = [
    {
        id: 'phq9',
        title: 'PHQ-9 Depression Screening',
        description: 'This is a multipurpose instrument for screening, diagnosing, monitoring and measuring the severity of depression.',
        questions: [
            { id: 1, question: "Little interest or pleasure in doing things", options: SCREENING_OPTIONS },
            { id: 2, question: "Feeling down, depressed, or hopeless", options: SCREENING_OPTIONS },
            { id: 3, question: "Trouble falling or staying asleep, or sleeping too much", options: SCREENING_OPTIONS },
            { id: 4, question: "Feeling tired or having little energy", options: SCREENING_OPTIONS },
            { id: 5, question: "Poor appetite or overeating", options: SCREENING_OPTIONS },
            { id: 6, question: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down", options: SCREENING_OPTIONS },
            { id: 7, question: "Trouble concentrating on things, such as reading the newspaper or watching television", options: SCREENING_OPTIONS },
            { id: 8, question: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual", options: SCREENING_OPTIONS },
            { id: 9, question: "Thoughts that you would be better off dead or of hurting yourself in some way", options: SCREENING_OPTIONS },
        ],
        interpretations: [
            { score: 0, level: 'Minimal Depression', text: 'Your score suggests you may be experiencing minimal or no symptoms of depression. Continue to monitor your mood and practice self-care.', color: 'bg-green-500' },
            { score: 5, level: 'Mild Depression', text: 'Your score suggests you may be experiencing mild symptoms of depression. It might be helpful to talk to someone you trust or explore some self-help resources.', color: 'bg-yellow-400' },
            { score: 10, level: 'Moderate Depression', text: 'Your score suggests you may be experiencing moderate symptoms of depression. This is a good time to consider speaking with a professional counsellor to discuss how you are feeling.', color: 'bg-orange-400' },
            { score: 15, level: 'Moderately Severe Depression', text: 'Your score suggests you may be experiencing moderately severe symptoms of depression. It is highly recommended that you speak with a mental health professional for support.', color: 'bg-red-500' },
            { score: 20, level: 'Severe Depression', text: 'Your score suggests you may be experiencing severe symptoms of depression. It is very important to seek professional help right away. Please consider booking an appointment with a counsellor or contacting a helpline.', color: 'bg-red-700' },
        ]
    },
    {
        id: 'gad7',
        title: 'GAD-7 Anxiety Screening',
        description: 'A tool to measure the severity of generalized anxiety disorder. It can also be used as a general measure of anxiety.',
        questions: [
            { id: 1, question: "Feeling nervous, anxious, or on edge", options: SCREENING_OPTIONS },
            { id: 2, question: "Not being able to stop or control worrying", options: SCREENING_OPTIONS },
            { id: 3, question: "Worrying too much about different things", options: SCREENING_OPTIONS },
            { id: 4, question: "Trouble relaxing", options: SCREENING_OPTIONS },
            { id: 5, question: "Being so restless that it's hard to sit still", options: SCREENING_OPTIONS },
            { id: 6, question: "Becoming easily annoyed or irritable", options: SCREENING_OPTIONS },
            { id: 7, question: "Feeling afraid, as if something awful might happen", options: SCREENING_OPTIONS },
        ],
        interpretations: [
            { score: 0, level: 'Minimal Anxiety', text: 'Your score suggests you may have minimal or no symptoms of anxiety. This is a great sign. Keep up with your current coping strategies.', color: 'bg-green-500' },
            { score: 5, level: 'Mild Anxiety', text: 'Your score suggests you may be experiencing mild symptoms of anxiety. Learning some relaxation techniques or mindfulness exercises could be beneficial.', color: 'bg-yellow-400' },
            { score: 10, level: 'Moderate Anxiety', text: 'Your score suggests you may be experiencing moderate symptoms of anxiety. It would be a good idea to talk with a counsellor about these feelings to learn effective coping strategies.', color: 'bg-orange-400' },
            { score: 15, level: 'Severe Anxiety', text: 'Your score suggests you may be experiencing severe symptoms of anxiety. It is strongly recommended to seek support from a mental health professional soon to help manage these symptoms.', color: 'bg-red-500' },
        ]
    }
];

// Resource Hub Data
export const RESOURCE_CATEGORIES: ResourceCategory[] = ['Stress', 'Anxiety', 'Relationships', 'Self-Care', 'Academic'];

export const RESOURCES: Resource[] = [
    {
        id: 'stress-1',
        type: 'article',
        category: 'Stress',
        title: '5 Simple Ways to Manage Exam Stress',
        snippet: 'Feeling overwhelmed by exams? These five practical tips can help you stay calm and focused during crunch time.',
        imageUrl: 'https://picsum.photos/seed/stress1/400/200',
        content: `Exam season can be incredibly tough, but managing your stress is key to performing your best. Here are five simple strategies:
        
1.  **The Pomodoro Technique:** Work in focused 25-minute intervals, followed by a 5-minute break. This prevents burnout and improves concentration. After four "Pomodoros," take a longer break of 15-30 minutes.
2.  **Mindful Breathing:** When you feel anxiety rising, take a moment to focus on your breath. Inhale slowly for four counts, hold for four, and exhale for six. This simple exercise can calm your nervous system instantly.
3.  **Stay Active:** Even a short 15-minute walk can clear your head, boost your mood, and improve memory retention. Don't sacrifice physical activity for study time.
4.  **Prioritize Sleep:** All-nighters are counterproductive. Your brain consolidates information while you sleep. Aim for 7-8 hours to ensure you're well-rested and can recall what you've studied.
5.  **Healthy Snacking:** Fuel your brain with healthy foods like nuts, fruits, and yogurt. Avoid sugary snacks that lead to energy crashes. Proper nutrition is vital for cognitive function.`
    },
    {
        id: 'anxiety-1',
        type: 'video',
        category: 'Anxiety',
        title: 'Understanding and Calming Anxiety',
        snippet: 'This short animated video explains what happens in your brain during an anxiety response and guides you through a calming technique.',
        imageUrl: 'https://picsum.photos/seed/anxiety1/400/200',
        content: 'https://www.youtube.com/embed/FfSbpg-UaOU' // Example YouTube embed link
    },
    {
        id: 'selfcare-1',
        type: 'article',
        category: 'Self-Care',
        title: 'The Student\'s Guide to Digital Detox',
        snippet: 'Constant notifications and social media pressure can be draining. Learn how to take a healthy break from your devices.',
        imageUrl: 'https://picsum.photos/seed/selfcare1/400/200',
        content: `In a world that's always online, taking a step back from your screen is a powerful act of self-care. A digital detox can reduce stress, improve sleep, and help you be more present in your daily life.

**Start Small:** You don't have to go completely offline. Begin by setting "no-phone" times, such as the first hour after you wake up or during meals.

**Curate Your Feed:** Unfollow accounts that make you feel inadequate or stressed. Your online space should be a positive and inspiring one.

**Turn Off Non-Essential Notifications:** Do you really need to know every time someone likes your photo? Disabling notifications gives you control over when you engage with your apps.

**Find Offline Hobbies:** Rediscover activities that don't involve a screen. Read a book, go for a hike, learn to cook, or spend quality time with friends. The goal is to replace screen time with meaningful, real-world experiences.`
    },
    {
        id: 'relationships-1',
        type: 'article',
        category: 'Relationships',
        title: 'Navigating Friendships in University',
        snippet: 'University life brings new social dynamics. Here’s how to build and maintain healthy friendships.',
        imageUrl: 'https://picsum.photos/seed/friends1/400/200',
        content: `Friendships are a cornerstone of the university experience, but they can also be complex. Building a strong support system is crucial for your well-being.
        
**Be Open and Approachable:** Join clubs, attend events, and strike up conversations in class. A simple "hello" can be the start of a great friendship.
        
**Quality over Quantity:** It's better to have a few close, supportive friends than a large group of acquaintances. Invest your time and energy in people who uplift you.
        
**Communicate Honestly:** Misunderstandings happen. The best way to resolve conflict is through open and respectful communication. Don't let issues fester.
        
**Set Boundaries:** It's okay to say no. A healthy friendship respects your time, energy, and personal boundaries. Don't feel pressured to do things that make you uncomfortable.`
    },
    {
        id: 'academic-1',
        type: 'video',
        category: 'Academic',
        title: 'How to Stop Procrastinating',
        snippet: 'A practical and science-based guide to understanding why you procrastinate and how to build better habits for academic success.',
        imageUrl: 'https://picsum.photos/seed/academic1/400/200',
        content: 'https://www.youtube.com/embed/FWTNMzK9vG4' // Example YouTube embed link
    },
    {
        id: 'stress-2',
        type: 'video',
        category: 'Stress',
        title: 'Guided 10-Minute Meditation for Stress Relief',
        snippet: 'Follow this guided meditation to release tension from your body and mind. Perfect for a quick break between study sessions.',
        imageUrl: 'https://picsum.photos/seed/stress2/400/200',
        content: 'https://www.youtube.com/embed/O-6f5wQXSu8' // Example YouTube embed link
    }
];


// Appointment Booking Data
export const COUNSELLORS: Counsellor[] = [
    {
        id: 'counsellor-1',
        name: 'Dr. Anjali Sharma',
        specialties: ['Anxiety', 'Stress Management', 'Relationships'],
        imageUrl: 'https://picsum.photos/seed/counsellor1/200/200',
        availability: {
            // Monday, Wednesday, Friday
            1: [{ hour: 9, minute: 0 }, { hour: 10, minute: 0 }, { hour: 11, minute: 0 }, { hour: 14, minute: 0 }, { hour: 15, minute: 0 }],
            3: [{ hour: 9, minute: 0 }, { hour: 10, minute: 0 }, { hour: 11, minute: 0 }, { hour: 13, minute: 0 }, { hour: 14, minute: 0 }],
            5: [{ hour: 9, minute: 0 }, { hour: 10, minute: 0 }, { hour: 11, minute: 0 }, { hour: 12, minute: 0 }],
        }
    },
    {
        id: 'counsellor-2',
        name: 'Mr. Rohan Desai',
        specialties: ['Academic Pressure', 'Career Counselling', 'Self-Esteem'],
        imageUrl: 'https://picsum.photos/seed/counsellor2/200/200',
        availability: {
            // Tuesday, Thursday
            2: [{ hour: 9, minute: 30 }, { hour: 10, minute: 30 }, { hour: 11, minute: 30 }, { hour: 14, minute: 30 }, { hour: 15, minute: 30 }],
            4: [{ hour: 10, minute: 0 }, { hour: 11, minute: 0 }, { hour: 12, minute: 0 }, { hour: 15, minute: 0 }, { hour: 16, minute: 0 }],
        }
    },
    {
        id: 'counsellor-3',
        name: 'Ms. Priya Kapoor',
        specialties: ['Depression', 'Family Issues', 'Mindfulness'],
        imageUrl: 'https://picsum.photos/seed/counsellor3/200/200',
        availability: {
            // Monday, Tuesday, Wednesday, Thursday
            1: [{ hour: 16, minute: 0 }, { hour: 17, minute: 0 }],
            2: [{ hour: 16, minute: 30 }, { hour: 17, minute: 30 }],
            3: [{ hour: 15, minute: 0 }, { hour: 16, minute: 0 }, { hour: 17, minute: 0 }],
            4: [{ hour: 17, minute: 0 }],
        }
    }
];
