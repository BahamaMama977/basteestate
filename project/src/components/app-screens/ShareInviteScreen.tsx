import { QRCodeSVG } from 'qrcode.react'
import { ChevronLeft, Copy, Link2, Share2 } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { demoObject, referral } from '@/lib/demo-deal'

/** Шаринг объекта с персональной реф-ссылкой: клиент закрепляется за риэлтором. */
export function ShareInviteScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="flex min-h-0 flex-1 flex-col bg-app-dark-bg">
        <div className="flex shrink-0 items-center gap-3 px-4 pt-3">
          <ChevronLeft className="h-6 w-6 text-app-dark-text" strokeWidth={2} />
          <p className="text-[15px] font-semibold text-app-dark-text">Поделиться</p>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-4 pt-4">
          <p className="text-[13px] text-app-dark-caption">Поделитесь ссылкой или QR-кодом на объект «{demoObject.title}, {demoObject.area}».</p>

          {/* QR-карточка */}
          <div className="mt-4 rounded-2xl border border-app-dark-border bg-app-dark-surface p-4">
            <div className="mx-auto w-fit rounded-xl bg-white p-3">
              <QRCodeSVG value={`https://${referral.url}`} size={150} bgColor="#FFFFFF" fgColor="#0F1217" level="M" marginSize={0} title="QR-код приглашения" />
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-app-dark-inset px-3 py-2.5">
              <Link2 className="h-4 w-4 shrink-0 text-app-dark-trust" strokeWidth={2} />
              <p className="truncate text-[12px] text-app-dark-caption">{referral.url}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-app-dark-trust-soft px-3 py-2 text-[11px] text-app-dark-trust">
            Клиент откроет ссылку — и закрепится за вами. Авторство сохранится в сделке.
          </div>
        </div>

        <div className="shrink-0 space-y-2 px-4 pb-6 pt-3">
          <span className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-app-dark-trust text-[14px] font-semibold text-app-dark-bg">
            <Share2 className="h-4 w-4" strokeWidth={2} />
            Поделиться ссылкой
          </span>
          <span className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-app-dark-border text-[14px] font-semibold text-app-dark-text">
            <Copy className="h-4 w-4" strokeWidth={2} />
            Копировать
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}
