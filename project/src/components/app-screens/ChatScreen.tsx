import Image from 'next/image'
import { CheckCheck, ChevronLeft, MoreVertical, Send } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { acts, chat, demoObject, participants, type DealAct } from '@/lib/demo-deal'

/** Чат по объекту глазами покупателя: его сообщения справа, ответы продавца слева. */
export function ChatScreen({ act = acts[1] }: { act?: DealAct }) {
  const messages = chat.slice(0, act.chatCount)
  return (
    <PhoneFrame>
      {/* Шапка — продавец */}
      <div className="flex shrink-0 items-center gap-3 border-b border-app-line bg-app-bg px-3 py-2.5">
        <ChevronLeft className="h-6 w-6 text-app-ink" strokeWidth={2} />
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-app-brand-soft">
          <span className="flex h-full w-full items-center justify-center text-[13px] font-bold text-app-brand">
            {participants.seller.initials}
          </span>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-app-success" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-app-ink">{participants.seller.shortName ?? participants.seller.name}</p>
          <p className="text-[11px] font-medium text-app-success">онлайн</p>
        </div>
        <MoreVertical className="h-5 w-5 text-app-caption" strokeWidth={2} />
      </div>

      {/* Карточка объекта чата */}
      <div className="shrink-0 px-3 py-2">
        <div className="flex items-center gap-3 rounded-2xl bg-app-muted p-2">
          <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-xl bg-app-inset">
            <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="56px" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-app-ink">{demoObject.title}, {demoObject.area}</p>
            <p className="truncate text-[11px] text-app-caption">{demoObject.district}</p>
          </div>
          <p className="shrink-0 text-[13px] font-bold text-app-ink">{demoObject.priceShort}</p>
        </div>
      </div>

      {/* Лента сообщений */}
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden bg-app-muted/40 px-3 py-3">
        {messages.length > 0 && (
          <div className="mx-auto rounded-full bg-app-inset px-3 py-1 text-[10px] font-medium text-app-caption">Сегодня</div>
        )}
        {messages.map((m) => {
          const me = m.from === 'buyer'
          return (
            <div key={m.time} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[76%] px-3 py-2 text-[13px] leading-snug shadow-sm ${
                  me
                    ? 'rounded-2xl rounded-br-md bg-app-brand text-white'
                    : 'rounded-2xl rounded-bl-md border border-black/5 bg-white text-app-ink'
                }`}
              >
                <p>{m.text}</p>
                <div className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${me ? 'text-white/70' : 'text-app-placeholder'}`}>
                  <span>{m.time}</span>
                  {me && <CheckCheck className="h-3.5 w-3.5" strokeWidth={2} />}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Поле ввода */}
      <div className="flex shrink-0 items-center gap-2 border-t border-app-line bg-app-bg px-3 py-2.5 pb-6">
        <div className="flex flex-1 items-center rounded-full bg-app-muted px-4 py-2.5">
          <span className="text-[13px] text-app-placeholder">Сообщение</span>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-app-brand text-white">
          <Send className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
    </PhoneFrame>
  )
}
