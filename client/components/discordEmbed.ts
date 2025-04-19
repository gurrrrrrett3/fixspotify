import '../styles/discordEmbed.css'
import cover from '../assets/images/starfall.webp'

export function initDiscordEmbed() {
  const discordEmbed = `
    <section class="discord-embed">
      <span>Before</span>
      <section class="embed">
        <div class="profile-picture"></div>
        <section class="content">
          <section class="infos">
            <span>gart</span>
            <span>Today at 7:21 PM</span>
          </section>
          <p>https://open.spotify.com/intl-fr/track/1J4RXX9fjPliGlHzvXlKtN?si=8c85a21a0c6e4c06</p>
        </section>
      </section>
      <span>After</span>
      <section class="embed">
        <div class="profile-picture"></div>
        <section class="content">
          <section class="infos">
            <span>gart</span>
            <span>Today at 7:21 PM</span>
          </section>
          <p>https://open.fixspotify.com/view?type=track&id=1J4RXX9fjPliGlHzvXlKtN</p>
          <section class="fixspotify-embed">
            <section class="infos">
              <span>FixSpotify</span>
              <span class="track-name">Starfall</span>
              <section class="details">
                <span>By SALEM • 2:48</span>
                <span>Track 5 of 11 on Fires in Heaven</span>
                <span>Released October 30, 2020</span>
              </section>
            </section>
            <img src="${cover}" alt="SALEM - Fires in Heaven Cover" />
        </section>
      </section>
    </section>
  `;
  const discordEmbedContainer = document.getElementById('discord-embed-container');
  if (discordEmbedContainer) {
    discordEmbedContainer.innerHTML = discordEmbed;
  }
}
initDiscordEmbed();