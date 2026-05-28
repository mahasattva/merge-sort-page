import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();

const SYSTEM_PROMPT = `당신은 은빛장터의 친절한 AI 상담사입니다.
은빛장터는 60세 이상 시니어를 위한 온라인 쇼핑몰로, 건강/생활/식품 카테고리 상품을 판매합니다.

상담 원칙:
- 쉽고 명확한 한국어를 사용하세요.
- 답변은 3-4문장 이내로 간결하게 해주세요.
- 상품 문의, 주문·배송, 반품·교환, 회원가입·로그인 등 쇼핑 관련 질문에 답변하세요.
- 모르는 내용은 솔직하게 안내하고 고객센터(1234-5678)를 안내하세요.
- 항상 친절하고 따뜻한 말투를 유지하세요.`;

router.post('/', async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: '메시지가 필요합니다.' });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });
    res.json({ content: response.content[0].text });
  } catch (err) {
    console.error('[aiChat]', err.message);
    res.status(500).json({ error: '잠시 후 다시 시도해 주세요.' });
  }
});

export default router;
