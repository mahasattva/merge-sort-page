---
title: "Karpathy's Obsidian RAG + Claude Code = CHEAT CODE"
source: "https://www.youtube.com/watch?v=OSZdFnQmgRw"
author:
  - "[[Chase AI]]"
published: 2026-04-05
created: 2026-04-07
description: "⚡Master Claude Code, Build Your Agency, Land Your First Client⚡https://www.skool.com/chase-ai🔥FREE community🔥https://www.skool.com/chase-ai-community/classroom/4fe79bd0?md=0f0e5f837fdc4760aa100b"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=OSZdFnQmgRw)

⚡Master Claude Code, Build Your Agency, Land Your First Client⚡  
https://www.skool.com/chase-ai  
  
🔥FREE community🔥  
https://www.skool.com/chase-ai-community/classroom/4fe79bd0?md=0f0e5f837fdc4760aa100b35a85c6498  
  
💻 Need custom work? Book a consult 💻  
https://chaseai.io  
  
Karpathy just replaced RAG with Obsidian.  
  
In this video, I break down how Karpathy's Obsidian knowledge base works, how to set it up yourself, and when a "true" RAG system is actually needed.  
  
⏰TIMESTAMPS:  
0:00 - Intro  
0:52 - Obsidian "RAG"  
3:22 - How it Works  
6:30 - The Setup  
11:39 - When True RAG Makes Sense  
  
RESOURCES FROM THIS VIDEO:  
➡️ Master Claude Code: https://www.skool.com/chase-ai  
➡️ My Website: https://www.chaseai.io  
➡️ Karpathy Tweet: https://x.com/karpathy/status/2039805659525644595  
  
#claudecode #obsidian

## Transcript

### Intro

**0:00** · Andre Carpathy just gave us the keys to his personal Obsidian Rag system. And I put Rag in air quotes because this Obsidian power knowledge base has no vector database, no embeddings, and no complicated retrieval process. Yet, it solves the exact same problem that these more complicated rag structures claim to do, which is allow our large language model to handle large amounts of documents and answer questions and gather accurate information about them.

**0:30** · And the best part about this Obsidian powered system is that it is very lightweight. It's essentially free and it is the perfect middle ground for a solo operator or a small team. So today I'm going to show you how Carpathy's Obsidian knowledge system works, how to set it up yourself, and how it differs between traditional rag systems so you know if this is the right option for you. So the process by which we are going to create this obsidianpowered knowledge system was laid out yesterday in a pretty comprehensive Twitter post by Andre Karpathy. Now, the big takeaway from this post is that we are able to create large language model knowledge bases that essentially act in the same way as something like light rag or rag anything or any other graph rag system with obsidian. And we're able to do so in a rather simple manner by just having a clever structure to our file system and how we actually ingest data. And the end result is that I am able to ingest a pretty significant amount of data and documents into my Obsidian vault and use cloud code to ask questions about it to figure out connections between different things. Aka the exact same thing you would do with a traditional rag system, but with none of the overhead and a way simpler setup. And as Andre lays out, the setup looks something like this.

### Obsidian "RAG"

**1:49** · First, we have data ingestion. We are bringing in articles. We're bringing in papers. We're bringing in repos from the internet or from wherever and we're bringing it into a raw directory inside of our Obsidian vault. This is essentially the staging area before it gets turned into a wiki. We as the human being in this interaction are able to see all of this happening via Obsidian.

**2:10** · Obsidian for all intents and purposes is our front end. Here is where I can see where all the documents are laid out.

**2:15** · Here's where I can read all the wiks.

**2:17** · So, it isn't sort of abstracted away in a black box like it isn't a rag system.

**2:21** · It's kind of hard even in a graph rag setup like light rag to actually go inside of here and really see everything. I mean I can but as cool as this looks this isn't you know very efficient and from there you just do a Q&A via something like cloud code and like Andre laid out here he expected that he would have to reach out for something like rag but the large language model has been pretty good about automaintaining index files and brief summary of all the documents it reads and this is something we are going to be able to do too with a pretty simple cloudmd file which I will be giving you and you will be able to find that cla md as well as a written guide that comes with a bunch of prompts inside head of my free Chase AI community. There will be a link to that in the description of this video. And speaking of Chase AI, and you knew this was coming, quick plug for my Cloud Code Masterass. Just released this a couple weeks ago, and it is the number one place to go from zero to AI dev, especially if you do not come from a technical background. You can find a link to this in the pinned comment. So, make sure to check this out if you're serious about learning this tool. Now, before we jump into the specifics of how to set up this Obsidian system for yourself, let's go over the actual file structure because this is important to understand how data is coming into our vault and then getting turned into wikis. So, the Obsidian vault is where everything lives. As you'll see, if you've never used it before, when you download Obsidian, you are going to designate a specific folder as the vault. In my case, it is quite literally called the vault. That's where everything in Obsidian lives. As a subfolder of the vault, we are going to have the raw folder. The raw folder is where all of our research gets dumped.

### How it Works

**3:58** · Anything we want to manually include in these wikis gets put. This is essentially the staging folder. So, this is where all the raw data is going to be held. This can be markdown files. This can be PDFs. And I'm going to show you how to use the Obsidian Clipper to essentially turn any web page into a markdown file that gets sent to the raw folder automatically. We will have another subfolder that is the wiki folder. So what the large language model is going to do, what cloud code will do for us is on demand or you could have it even be a skill or have it be automated is we are going to point it at the raw folder and say hey I want you to create a wiki about whatever subject you've been gathering information about. From there it will then create a wiki about that. So you can see we have three different wiks here. One for AI agents, one for rag systems and one for content creation. Now in in between the wiki folder and these sub wiki folders is the master index markdown. This is essentially just a list of all of the different wiks that have been created because the idea is when you this is you when you talk to claude code all right that's cloud code over there and say hey I want to learn more about AI agents can you ask you know I want to ask questions about my wiki well what is it going to do? Well, it's going to go to the vault because you're probably already in there. It's then going to go to the wiki folder. It's going to go to the master index folder and say, "Hey, what wikies have we created?" Oh, he wants to know about rag systems. Okay, goes down to rag and the wiki folders themselves have index files which break down all the additional content. So, what Obsidian gives us and what this file structure gives us is a very clear path to find information even if we have a ton of it floating around. And this helps claude code because it's not going to have a ton of issues finding the data. We're not going to run a million tool calls to see what's in our file structure, but it also helps you because it's very clear where to go. For example, over here on the left is my Obsidian folder. I'm in the Obsidian UI, and we'll go through the download here in a second. But if I want to see a wiki, what do I do? I just go to wiki. I have a master index which lays down everything in there. Right now, it's just three things, but if there were 3,000, it still wouldn't be too difficult. And then from there, you know, I can click on it. It takes me to the index of that specific wiki. And then I can look at different stuff inside of there. It's that simple. And it's that simple for AI, too, which is why we're able to use essentially just a markdown file structure to somewhat mimic a rag system. So, while that theory is cool, now let's go into how to actually set this up for yourself. First and foremost, you're going to need to download Obsidian. You're just going to head to obsidian.md, hit download now, go through the wizard.

### The Setup

**6:38** · It's completely free and you're going to designate some folder as the vault. Just create one, call it the vault. Makes it easy for me and that'll probably work for you. After we create the vault, we now need to set up this file structure inside of it. The easiest way to do that is with Claude Code. Simply open up Claude Code in the vault. So that's the directory I'm in. And you're going to give it a prompt telling it to create this file structure. Now, luckily for you, I already created the prompt. So you can just copy this thing and paste it in the cloud code. Now, if you're like me and you've already been using Obsidian for a bit, you probably have a bunch of folders already in there. So, maybe you don't want to call it RAW.

**7:17** · Maybe you want to call it something else. The whole point of it is you just need to designate some folder is, like I said, sort of the holding area or the staging area for where all this information is going to get dumped until it gets turned into a wiki. So, adjust as needed. Now, the next thing we want to do is create a cloud.md file.

**7:31** · Personal assistant type projects, things like this that are very markdown heavy, claw.mds are perfect for. And this claw.md file is breaking down the knowledgebased rules as well as how to essentially traverse it. So again that we aren't wasting tokens when we ask questions. Again I have this entire claw.md template prompt you can use this claw.md file is also telling claude how to structure these markdown files. So it's very easy to traverse files with this wiki links format. Now let's talk about how we can bring things into this raw folder. How we can get data into our system in the first place. Well, a super easy way to do this is with the Obsidian Web Clipper. So, I will put a link to this in the school or you can go to obsidian.mmd/clipper.

**8:16** · And this is just a Chrome extension which makes it super easy to turn a web page into data into a markdown file.

**8:23** · Now, the one issue with this web clipper is it's going to struggle with images.

**8:26** · It's just not even going to bring them in. It'll have them as a link. But I want to be able to see the images from these documents I ingest inside of Obsidian. So, what do we do? Well, we are going to use an Obsidian community skill or Obsidian community plugin to help with this. So, one of the cool things about Obsidian is the community plugins. There's thousands of them. So, if you're inside of Obsidian, I'm inside the desktop app right now. If I come down here and I hit this little gear, I'm going to go to community plugins.

**8:52** · I'm going to go to browse. And then you're going to search for local images plus. You're going to download it, install it, and turn it on. Make sure it's enabled. You can confirm it's enabled by heading to your community plugins tab and seeing this little tab turned on. Now, if we use the Obsidian Web Clipper, and I can see that over here as an extension, you can see what happens. It immediately pulls everything. And if I hit add to Obsidian, I can see this entire article, including the images. Now, there is one thing we need to set up inside of the web clipper, and that's making sure it actually pulls it into the raw folder automatically. I don't want to have to manually do that. You're just going to head to the options on your web clipper.

**9:34** · I just rightclicked it. And then over here on the left where it says default, I created my own new template, but you can stick on the default if you want.

**9:42** · Where it says location and note location right here, you're want you're going want to change that from clippings to raw. And that will make sure when you use the web clipper, it automatically goes into the raw folder. So now with the Obsidian Web Clipper extension and the images community plugin, we can now turn any web page on the internet into a markdown file that will be used for our wiki. But that is just one data funnel. That's a manual one. We can have Claude Code do a bunch of heavy lifting, too. So let's say I was trying to create a wiki about Claude Code skills. So I told Claude Code, let's create a wiki about claude code skills. I already included some info in the raw folder, what we pulled in via the web clipper. go conduct your own research and bring in the relevant raw MD files to generate that wiki. So what is it going to do? It's going to go on the internet use its standard web search and it's going to create its own wiki about claude code skills. So what you see is that this raw folder this whole raw pipeline that's more for you.

**10:42** · That's for when you mainly want to put in some information. Now you can have cloud code do that as well but cloud code is also smart enough to essentially take the research figure out what's relevant itself and just create the wiki directly. This raw folder is really for you the human being to have some level of organization. And here's what cloud code came back with. So it created the cloud code skills wiki. We see here in the master index that it's referenced here. If I click on it, this then brings us to the index of claude code skills.

**11:10** · And right now it has four articles. So here's the skills overview article. You can see it links to websites and it also links to different articles within our obsidian vault. So if I click on skill ecosystem, here's more stuff. If I click on top skills, right? So on and so forth. There's a very clear pathway from one article to another and how these things relate. Which means when you ask cloud code questions about these articles in these subjects, it's easy and cheap for it to answer questions about them. Which then brings us to the obvious question. Do we need rag at all?

### When True RAG Makes Sense

**11:43** · You know, we look at something like this light rag setup. You watch my last few videos with light rag and rag anything.

**11:49** · and seeing how simple the setup with Obsidian, you're probably like, "Well, why would I ever even bother with these more complicated setups at all?" And the truth is, if you're a solo dev, a solo operator, or a small team that isn't dealing with thousands of documents, the answer probably is Obsidian makes more sense for you. It's lightweight, and you really don't need Rag. These large language models, these harnesses like Cloud Code are good enough for your use case. And we can sit here and get in the weeds about the differences between the obsidian rag and true rag. But the truth is the big thing is scale, right? Are we trying to scale to millions of documents or are we not? Because at a certain scale, it's going to be cheaper and faster to use a proper rag system no matter how good cloud code is at navigating this MD file document network you've created. But this isn't a question you necessarily need to have the exact answer to right away. Why wouldn't you just start with something like obsidian? And if it's clear your scale goes well beyond the bounds of what this thing can handle, then just move into rag. I think people get really caught up in like answering this question when it's like just try it out.

**12:57** · Just experiment. It's not costing you anything to use some sort of rag system, rag system like obsidian. And if it doesn't work, it doesn't work. Fine.

**13:05** · Then go use light rag instead. People want to sit here as they inevitably will in the comments and like argue this back and forth. Just try it. And I think the answer will be pretty clear at a certain point when you need to move to a true rag system. But the nice thing with this is is again most people don't need a real rag system. They just don't, right?

**13:22** · Even if they're in a small business team situation. So having a proper, you know, orchestrated system like the subsidian knowledge base, I think is a huge boon to the majority of people. So I hope this breakdown was useful to you.

**13:35** · Definitely check out Andre's post about this. He goes into a fair amount of detail. Make sure to check out the free Chase AI school. There's a link to that in the description that has all the prompts and a written breakdown of how to actually do this if you got confused at any part. And as always, take a look at Chase AI Plus if you want to get your hands on that master class. Besides that, let me know what you thought and I'll see you

---

## 한국어 번역

---
title: "카파시의 Obsidian RAG + Claude Code = 치트 코드"
source: "https://www.youtube.com/watch?v=OSZdFnQmgRw"
저자: "[[Chase AI]]"
출판일: 2026-04-05
생성일: 2026-04-07
설명: "Claude Code 마스터, 에이전시 구축, 첫 번째 클라이언트 확보"
---

## 전사

### 소개

**0:00** · Andre Karpathy가 방금 그의 개인 Obsidian RAG 시스템의 열쇠를 우리에게 줬습니다. 제가 RAG를 따옴표 안에 넣는 이유는 이 Obsidian 파워 지식 베이스에는 벡터 데이터베이스도, 임베딩도, 복잡한 검색 과정도 없기 때문입니다. 그러나 그것은 이러한 더 복잡한 RAG 구조가 주장하는 것과 정확히 같은 문제를 해결합니다 — 즉 대형 언어 모델이 대량의 문서를 처리하고 질문에 답하며 정확한 정보를 수집하는 것.

**0:30** · 그리고 이 Obsidian 기반 시스템의 가장 좋은 점은 매우 경량이라는 것입니다. 본질적으로 무료이며 개인 운영자나 소규모 팀에게 완벽한 중간 지점입니다. 오늘 저는 Karpathy의 Obsidian 지식 시스템이 어떻게 작동하는지, 직접 설정하는 방법, 전통적인 RAG 시스템과의 차이점을 보여드릴 것입니다.

### Obsidian "RAG"

**1:49** · 먼저 데이터 수집이 있습니다. 우리는 인터넷이나 다른 곳에서 글, 논문, 저장소를 가져와 Obsidian 볼트 안의 raw 디렉토리에 넣습니다. 이것은 기본적으로 위키로 전환되기 전의 준비 구역입니다. 우리가 수동으로 포함시키고 싶은 모든 것이 여기에 들어갑니다.

**2:10** · Obsidian은 모든 의도와 목적을 위해 우리의 프론트엔드입니다. 여기서 모든 문서가 배치된 것을 볼 수 있습니다.

### 작동 방식

**3:58** · 위키에 수동으로 포함시키고 싶은 모든 것이 여기에 들어갑니다. 이것은 기본적으로 준비 폴더입니다. 마크다운 파일이 될 수 있고, PDF가 될 수도 있습니다. Obsidian Web Clipper를 사용하여 기본적으로 모든 웹 페이지를 raw 폴더로 자동 전송되는 마크다운 파일로 바꾸는 방법을 보여드릴 것입니다.

대형 언어 모델, Claude Code가 우리를 위해 할 일은 온디맨드로 — 또는 스킬이나 자동화로 만들 수 있음 — raw 폴더를 가리키고 "당신이 정보를 수집한 주제에 대한 위키를 만들어 줘"라고 말하는 것입니다. 그러면 그것에 대한 위키를 만들 것입니다.

### 설정

**6:38** · 완전히 무료이며 일부 폴더를 볼트로 지정할 것입니다. 볼트를 만들고 볼트라고 부르세요. 볼트를 만든 후, 이제 그 안에 이 파일 구조를 설정해야 합니다. 가장 쉬운 방법은 Claude Code를 사용하는 것입니다. 단순히 볼트에서 Claude Code를 열고 이 파일 구조를 만들도록 지시하는 프롬프트를 줍니다.

**7:31** · 이 CLAUDE.md 파일은 지식 베이스 규칙과 그것을 탐색하는 방법을 설명합니다. 질문할 때 토큰을 낭비하지 않기 위해서입니다. CLAUDE.md 파일은 또한 Claude에게 마크다운 파일을 구조화하는 방법을 알려줍니다. 위키 링크 형식으로 파일을 쉽게 탐색할 수 있도록.

### 진정한 RAG가 필요한 때

**11:43** · 개인 개발자, 개인 운영자, 또는 수천 개의 문서를 다루지 않는 소규모 팀이라면 대답은 아마도 Obsidian이 더 적합할 것입니다. 가볍고, 진정한 RAG가 실제로 필요 없습니다. 이 대형 언어 모델들, Claude Code 같은 하네스들은 당신의 사용 사례에 충분히 좋습니다.

큰 것은 규모입니다, 맞죠? 수백만 개의 문서로 확장하려고 하는지, 아닌지? 어떤 규모에서는 Claude Code가 만든 이 MD 파일 문서 네트워크를 탐색하는 데 아무리 능숙해도 적절한 RAG 시스템을 사용하는 것이 더 저렴하고 빠를 것입니다. 하지만 Obsidian으로 시작하지 않을 이유가 없습니다. 그리고 규모가 이 시스템이 처리할 수 있는 범위를 명확히 넘어서면 그냥 RAG로 이동하세요.