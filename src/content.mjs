export const sources = {
  gsa: 'https://2024.gsapostgradshowcase.net/nishabh-polke/',
  ux: 'https://drive.google.com/file/d/1NXH368uZ0Ig2Y9XnS8pbAngLiL28c1Ih/view',
  architecture: 'https://drive.google.com/file/d/11eZPTclnp6P3Qtb-099YudFFn1JQA7dJ/view',
  scarlet: 'https://www.behance.net/gallery/140793169/Scarlet-Scout',
  press: 'https://www.forres-gazette.co.uk/news/international-art-school-students-helping-with-town-s-projec-368974/',
  linkedin: 'https://www.linkedin.com/in/nishabhpolke/',
  video: 'https://vimeo.com/1000156249',
};

export const forresCaptions = [
  'The research question in the context of Forres',
  'Primary data analysis through sketches',
  'Sketches grouped into research themes',
  'Thematic analysis and relationships between findings',
  'Auto-ethnography through making',
  'Key compound insights from the research',
  'Preparing materials for co-design',
  'The first engagement tool: a Forres puzzle and discussion guide',
  'A perspective-taking tool for the workshop',
  'Stakeholders using the engagement tools during co-design',
  'Storyboards exploring possible community events',
  'Stakeholder map of local organizations and relationships',
  'Mapping funding and mutual benefit',
  'Developing the event concept with a stakeholder',
  'Exploring community engagement through sketching',
  'Developing the marketplace concept through sketching',
  'Exploring the event layout through sketching',
  'Reviewing early concepts with stakeholders',
  'Discussing and refining the proposals',
  'An accepted event proposal, as documented in the project',
  'Visualizing the proposed town-hall event',
  'Future engagement proposal: marketplace format',
  'Future engagement proposal: town-hall format',
  'Proposed long-term engagement between FACT and GSA',
  'Engagement-tool handover and stakeholder response',
  'The refined puzzle and discussion guide',
  'The finished engagement-tool box handed to FACT',
  'Ruth Jeffries’s recommendation and project photograph',
  'A stakeholder explaining the engagement tool to colleagues',
];

export const projects = [
  {
    slug: 'forres', title: 'Bringing communities into conversation.', short: 'Community research in Forres',
    year: '2024', context: 'Glasgow School of Art · FACT', role: 'Researcher & interaction designer',
    methods: 'Co-design · Stakeholder mapping · Research through making', cover: 'forres-26',
    coverAlt: 'The finished Forres engagement puzzle and guide arranged on a wooden table',
    summary: 'A place-based research project exploring how community groups and design students could learn from one another.',
    question: 'How could local groups and design students build lasting connections in Forres?',
    intro: 'FACTual explores connections between the people, organizations, and students who share a small Scottish town.',
    contribution: 'I developed the research, made engagement tools, facilitated co-design, and refined a puzzle and guide for Forres Area Community Trust (FACT).',
    overview: [
      'Forres had active community groups, but conversations with local leaders suggested that many worked separately. My master’s project explored how to bring those groups into dialogue with Glasgow School of Art students.',
      'The work combined a proposed community event with a tangible engagement tool that stakeholders could continue using.'
    ],
    approach: [
      ['Make the research tangible', 'I analyzed primary data through sketches and themes, then used making to reflect on my own relationship with Forres.'],
      ['Invite other perspectives', 'A place-based puzzle and guide turned research questions into a co-design activity. Stakeholders used the pieces and map to share experiences and discuss local challenges.'],
      ['Develop the proposal together', 'Stakeholder mapping, storyboards, and feedback helped shape the event concept and explore an ongoing relationship between FACT and GSA.']
    ],
    findings: [
      ['A tool could have a life beyond the workshop', 'Stakeholders saw uses for the puzzle in future community and trustee conversations. I refined the graphics and guide in response.'],
      ['The research made the process easier to discuss', 'In her recommendation, Ruth Jeffries describes how the mapping tools helped participants explore the opportunities and practical challenges of collaboration.']
    ],
    outcome: [
      'I handed the finished puzzle and guide to FACT. The event formats and long-term engagement plan were proposals at the time of the showcase.',
      'The Forres Gazette later reported that a community marketplace was inspired by this project. That subsequent event was organized by FACT and GSA; it is separate from my documented handover.'
    ],
    quote: '“open and easy to speak with and also well prepared with resources and tools”',
    quoteBy: 'Ruth Jeffries', quoteRole: 'Befriending Project Co-Ordinator, FACT · August 2024',
    evidence: [
      {image:'forres-03',caption:'Sketches grouped into research themes',alt:'Color-coded hand-drawn research notes grouped on a board'},
      {image:'forres-10',caption:'Co-design with stakeholders',alt:'Stakeholders moving puzzle pieces on a map of Forres'},
      {image:'forres-12',caption:'Mapping local stakeholders and relationships',alt:'A stakeholder map showing local organizations and their connections'},
      {image:'forres-24',caption:'A proposed long-term engagement plan',alt:'Diagram of proposed continued collaboration between FACT and Glasgow School of Art'}
    ],
    gallery: forresCaptions.map((caption,i)=>({image:`forres-${String(i+1).padStart(2,'0')}`,caption,alt:caption})),
    sourceLinks: [['GSA project showcase',sources.gsa],['Forres Gazette coverage',sources.press],['Engagement tool on Vimeo',sources.video]],
    download: 'forres-stakeholder-recommendation.pdf', downloadLabel: 'Read the stakeholder recommendation',
    sourceNote: 'Project documentation: GSA Postgraduate Showcase 2024. Recommendation: Ruth Jeffries, FACT, 13 August 2024. Later event coverage: Forres Gazette, 14 December 2024.'
  },
  {
    slug: 'endoscopic-device', title: 'Understanding the clinical workflow.', short: 'Endoscopic-device research',
    year: '2022–23', context: 'Monsoonfish', role: 'Co-researcher',
    methods: 'Contextual inquiry · Interviews · Workflow analysis', cover:'endoscopy-cover',
    coverAlt:'Endoscopic equipment and monitors photographed in a clinical setting',
    summary:'Field research connecting the realities of an operating theatre to the design of a new endoscopic device.',
    question:'What do clinicians need from an endoscopic device before, during, and after a procedure?',
    intro:'An endoscope is part of a larger system of people, equipment, and decisions. The research began in that system.',
    contribution:'As a co-researcher, I visited clinical settings, prepared and led interviews, and collected observational data. I independently carried out market and competitor research and visualized findings for weekly client reviews.',
    overview:[
      'The project supported the development of a new endoscopic device for a multinational medical-device company. Our team studied the context of use, existing workflows, and the needs of physicians, nurses, and technicians.',
      'The work brought together formative research, ethnographic observation, and market research to inform the design of the device and its interface.'
    ],
    approach:[
      ['Observe the whole procedure','With permission, the team visited hospitals and observed procedures in operating theatres. We recorded the arrangement of equipment, device interactions, workarounds, and the roles of people in the room.'],
      ['Connect interviews to observed work','Semi-structured interviews with doctors, nurses, and technicians added context to the observations. I mapped the procedure from preparation through post-procedure tasks, including variations and interactions with the controller and scope.'],
      ['Compare existing devices','I studied competing devices, user manuals, specifications, form factors, and interaction patterns. Findings were brought into weekly reviews with the design team and international client stakeholders.']
    ],
    findings:[
      ['A device interaction depends on the phase of work','The workflow map separated pre-procedure, procedure, additional-procedure, and post-procedure activities. It made the moments of interaction with the controller and scope visible alongside people’s responsibilities.'],
      ['Different roles bring different needs','Observation and interview data were organized into personas and maps of met, partially met, and unmet needs. The maps connected processor, scope, software, and hardware interactions.'],
      ['Research needed a route into prioritization','I translated findings into user stories and a five-point importance scale. The resulting story map brought the needs and gaps into a form the design team could discuss and prioritize.']
    ],
    outcome:[
      'The documented outputs include a procedure workflow, persona-based needs maps, prioritized user stories, device-operation studies, and competitor comparisons. These were presented to the client to inform physical-device and interface design.',
      'The portfolio does not document a product launch or measured post-launch outcomes. This case study covers the research contribution and its design inputs.'
    ],
    evidence:[
      {image:'ux-12',caption:'Clinical observation and operating-theatre layout',alt:'Research documentation of clinical equipment, placement, and operating-theatre layout'},
      {image:'ux-13',caption:'From observed procedure to a workflow map',alt:'A research map connecting the stages of an endoscopic procedure with people and device interactions'},
      {image:'ux-14',caption:'Mapping needs by role and interaction',alt:'A physician persona and workflow map separating met, partially met, and unmet needs'},
      {image:'ux-15',caption:'User stories and importance mapping',alt:'Research-based user stories and a map of feature priorities'}
    ],
    gallery:[11,12,13,14,15,16,17].map((p,i)=>({image:`ux-${String(p).padStart(2,'0')}`,caption:['Project overview and individual contribution','Clinical observation and research methods','Task and workflow analysis','Persona-based needs mapping','User stories and prioritization','Device-operation study','Competitor comparison'][i],alt:['Project overview and individual contribution','Clinical observation and research methods','Task and workflow analysis','Persona-based needs mapping','User stories and prioritization','Device-operation study','Competitor comparison'][i]})),
    sourceLinks:[['Original UX portfolio on Drive',sources.ux]],download:'nishabh-polke-ux-portfolio.pdf',downloadLabel:'Download the UX portfolio',sourceNote:'Source: UX Portfolio, PDF pages 11–17 (printed pages 10–16). Research conducted at Monsoonfish, 2022–23. Clinical observations and interviews were team activities; market and competitor analysis was Nishabh’s individual contribution.'
  },
  {
    slug:'tobacco-cessation',title:'Looking beyond task completion.',short:'Tobacco-cessation usability',
    year:'2022',context:'Monsoonfish',role:'UX researcher',methods:'Usability testing · Interviews · Mixed-method analysis',cover:'cessation-cover',
    coverAlt:'Qualitative research synthesis with participant feedback and analysis from the tobacco-cessation study',
    summary:'A usability study of a tobacco-cessation app, examining navigation, content, and the experience of getting expert support.',
    question:'How do people use a tobacco-cessation app, and where does the experience need support?',
    intro:'Finding a feature is one part of the experience. Understanding its value, and feeling comfortable using it, needs a closer look.',
    contribution:'I created discussion guides, conducted user interviews and testing, and prepared reports from the collected data as part of the research team.',
    overview:[
      'The application supported adults who wanted to stop using smoked or smokeless tobacco. It included a personalized quit plan, a chatbot, resources, and appointments with tobacco-cessation experts.',
      'The study took place across four Indian cities. The team combined direct observation, interviews, and quantitative feedback to understand usability and perceived usefulness.'
    ],
    approach:[
      ['Start with exploration','Participants explored the app and its content before an interview about navigation, convenience, and ease of use. Observation captured where they hesitated, needed help, or interpreted an interaction differently.'],
      ['Follow the appointment journey','Participants booked and attended a 15-minute online consultation through the app. They then completed a feedback form and follow-up interviews about the content, experience, and future use.'],
      ['Analyze tasks and conversations together','Task ratings were examined by age, gender, and tobacco-use preference. Interview responses added context to the numbers and were organized into themes for the client.']
    ],
    findings:[
      ['Stated preferences needed more context','Initial responses favored creating a quit plan, while later interviews revealed stronger interest in the Resources section. Reading the two together gave a fuller view of what people valued.'],
      ['Expert support changed how participants felt','The portfolio reports positive feedback after consultations, including interest in using expert support again. Participants who had initially hesitated described feeling more comfortable after speaking to an expert.'],
      ['Small interruptions added friction','The study documented long messages, limited time to read stories, problems after network loss, limited content filters, image-upload difficulty, and insufficient feedback when errors occurred.']
    ],
    outcome:[
      'The team delivered task analysis, interview synthesis, and recommendations to the client. Suggested improvements included clearer language, more accessible content, better chatbot interactions, reminders, and more flexible appointment booking.',
      'The documented results describe the study participants’ experience. They do not establish clinical effectiveness or sustained tobacco cessation, and the portfolio does not report implementation outcomes.'
    ],
    evidence:[
      {image:'ux-07',caption:'Research design, participant profile, and methods',alt:'Tobacco-cessation study methods and participant breakdown'},
      {image:'ux-08',caption:'The testing journey and interview findings',alt:'A sequence of app exploration, interviews, appointment booking, consultation, and feedback'},
      {image:'ux-09',caption:'Pain points, recommendations, and task analysis',alt:'A synthesis of tobacco-cessation app feedback alongside task-rating charts'},
      {image:'ux-10',caption:'Connecting quantitative and qualitative evidence',alt:'Task-analysis presentation and themed qualitative interview responses'}
    ],
    gallery:[6,7,8,9,10].map((p,i)=>({image:`ux-${String(p).padStart(2,'0')}`,caption:['Project overview and research objectives','Study methods and participant profile','Testing journey and summary','Findings and task analysis','Quantitative and qualitative synthesis'][i],alt:['Project overview and research objectives','Study methods and participant profile','Testing journey and summary','Findings and task analysis','Quantitative and qualitative synthesis'][i]})),
    sourceLinks:[['Original UX portfolio on Drive',sources.ux]],download:'nishabh-polke-ux-portfolio.pdf',downloadLabel:'Download the UX portfolio',sourceNote:'Source: UX Portfolio, PDF pages 6–10 (printed pages 5–9). Monsoonfish, 2022. All reported observations refer to this research sample, not clinical outcomes.'
  },
  {
    slug:'smart-home',title:'Making a connected home easier to use.',short:'Smart-home usability',
    year:'2022',context:'Monsoonfish',role:'User-testing study lead',methods:'In-home testing · Task analysis · Interviews',cover:'smart-home-cover',
    coverAlt:'Original smart-home research boards pairing app screens with task findings and design recommendations',
    summary:'In-home usability research on an app for controlling connected devices, rooms, and homes.',
    question:'Can people set up and manage connected devices without outside help?',
    intro:'A connected home still depends on someone understanding what to do next. This study examined those everyday steps.',
    contribution:'I led the user-testing study, created discussion guides, and defined the testing objectives. The team conducted visits, observation, and interviews with potential users.',
    overview:[
      'The application brought control of IoT devices into one mobile interface. People could manage devices such as lights and fans, assign them to rooms, and organize multiple homes.',
      'The client wanted to understand how people navigated the application and where its language, setup, or interaction design caused difficulty. Testing took place in six Indian cities.'
    ],
    approach:[
      ['Test in the home','The research team visited participants at home. After explaining the study and obtaining consent, we provided a device with the app installed and observed a series of tasks.'],
      ['Record performance and the reason behind it','Twelve tasks covered account setup, device pairing, rooms, homes, deletion, and sign-out. The team recorded task success alongside observed pain points and verbal feedback in a shared spreadsheet.'],
      ['Follow up with interviews','After the tasks, participants discussed usability, preferences, and expectations. Recorded interviews were transcribed and analyzed for recurring patterns. Findings and recommendations were presented task by task.']
    ],
    findings:[
      ['Device pairing needed clearer guidance','Pairing a bulb was one of the difficult tasks. The report describes people missing instructions, treating illustrations as interactive steps, and needing clearer confirmation of pairing progress.'],
      ['Moving devices between rooms was difficult to discover','The existing-device-to-new-room task had low completion in the report. The study made this less visible management flow a concrete area for design attention.'],
      ['Even a completed task could contain friction','Participants could complete adding a home while still struggling to find the relevant option or understand location suggestions. Task success alone did not explain the experience.']
    ],
    outcome:[
      'The deliverables combined task-level results, observed difficulties, interview themes, and recommendations grounded in usability heuristics. The recommendations addressed system feedback, instructions, terminology, and error recovery.',
      'The portfolio documents research and recommendations, rather than a shipped redesign or measured improvement after release.'
    ],
    evidence:[
      {image:'ux-03',caption:'In-home fieldwork and the twelve test tasks',alt:'Smart-home research methods, fieldwork locations, and task-performance summary'},
      {image:'ux-04',caption:'Recording task outcomes alongside observed difficulties',alt:'A research spreadsheet documenting task success and participant observations'},
      {image:'ux-05',caption:'From task evidence to design recommendations',alt:'Bulb-pairing and home-creation findings with annotated app screens and recommendations'}
    ],
    gallery:[2,3,4,5].map((p,i)=>({image:`ux-${String(p).padStart(2,'0')}`,caption:['Project overview and study objectives','Fieldwork and task analysis','Task-recording spreadsheet','Findings and recommendations'][i],alt:['Project overview and study objectives','Fieldwork and task analysis','Task-recording spreadsheet','Findings and recommendations'][i]})),
    sourceLinks:[['Original UX portfolio on Drive',sources.ux]],download:'nishabh-polke-ux-portfolio.pdf',downloadLabel:'Download the UX portfolio',sourceNote:'Source: UX Portfolio, PDF pages 2–5 (printed pages 1–4). Monsoonfish, 2022. Recommendations are documented proposals; implementation outcomes are not reported.'
  }
];
