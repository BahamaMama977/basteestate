'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { PlaceholderImage } from '../ui/PlaceholderImage'
import { Linkedin, Mail } from 'lucide-react'

const team = [
  {
    name: 'Имя Фамилия',
    role: 'CEO & Co-founder',
    bio: [
      '10 лет в коммерческой недвижимости',
      'Ex-Cushman & Wakefield',
      'MBA Skolkovo',
      '2 успешных стартапа',
    ],
    linkedin: '#',
    email: 'ceo@bast-estate.ru',
  },
  {
    name: 'Имя Фамилия',
    role: 'CTO & Co-founder',
    bio: [
      'Ex-Яндекс (Team Lead, 5 лет)',
      '3 приложения с 1M+ загрузок',
      'MSc Computer Science, МФТИ',
      'Эксперт в масштабировании',
    ],
    linkedin: '#',
    email: 'cto@bast-estate.ru',
  },
  {
    name: 'Имя Фамилия',
    role: 'CPO & Co-founder',
    bio: [
      '8 лет в продукте',
      'Ex-Avito, Ex-ЦИАН',
      '+180% retention за год',
      'Знает рынок изнутри',
    ],
    linkedin: '#',
    email: 'cpo@bast-estate.ru',
  },
]

const advisors = [
  {
    name: 'Имя Фамилия',
    role: 'Ментор',
    description: 'Партнер в VC Fund, эксперт в PropTech',
  },
  {
    name: 'Имя Фамилия',
    role: 'Советник',
    description: 'CEO крупного застройщика (50+ проектов)',
  },
  {
    name: 'Имя Фамилия',
    role: 'Советник',
    description: 'Ex-VP Product в PropTech компании',
  },
]

export function TeamSection() {
  return (
    <section id="team" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-200 via-surface-100 to-surface-200" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Команда"
          title="Опытная команда с экспертизой в недвижимости и технологиях"
        />

        {/* Main team */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <motion.div
              key={member.name + index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="relative">
                {/* Photo placeholder */}
                <div className="relative mb-6 overflow-hidden">
                  <PlaceholderImage
                    variant="avatar"
                    label="Фото"
                    className="w-full aspect-[3/4]"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                      <a
                        href={member.linkedin}
                        className="w-10 h-10 rounded-md bg-accent-500/20 border border-accent-400/40 flex items-center justify-center hover:bg-accent-500/40 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-surface-50" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 rounded-md bg-accent-500/20 border border-accent-400/40 flex items-center justify-center hover:bg-accent-500/40 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-surface-50" />
                      </a>
                    </div>
                  </div>

                  {/* Corner decorations */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-accent-400/30" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-accent-400/30" />
                </div>

                {/* Info */}
                <h3 className="font-display text-xl text-ink-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-accent-600 font-accent mb-4">
                  {member.role}
                </p>

                {/* Bio */}
                <ul className="space-y-2">
                  {member.bio.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm text-ink-600 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-accent-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advisors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center font-heading text-sm uppercase tracking-wider text-ink-500 mb-8">
            Советники и менторы
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name + index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg p-6 bg-white/90 border border-ink-900/10 hover:border-accent-400/50 transition-all duration-300 text-center shadow-soft"
              >
                {/* Avatar placeholder */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                  <PlaceholderImage
                    variant="avatar"
                    className="w-full h-full"
                  />
                </div>

                <h4 className="font-display text-lg text-ink-900 mb-1">
                  {advisor.name}
                </h4>
                <p className="text-xs text-accent-600 font-accent mb-2">
                  {advisor.role}
                </p>
                <p className="text-sm text-ink-500">
                  {advisor.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
