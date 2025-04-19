import { initNav } from '../components/nav'
import { initDisclaimer } from '../components/disclaimer'
import { initStats } from '../components/stats'
import { initSocials } from '../components/socials'
import { initDiscordEmbed } from '../components/discordEmbed'

export { initNav } from '../components/nav'
export { initDisclaimer } from '../components/disclaimer'
export { initStats } from '../components/stats'
export { initSocials } from '../components/socials'
export { initDiscordEmbed } from '../components/discordEmbed'

export function initComponents() {
  initNav()
  initDisclaimer()
  initStats()
  initSocials()
  initDiscordEmbed()
}

initComponents();