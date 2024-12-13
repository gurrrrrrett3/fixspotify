import { Album, Artist, Playlist, Track } from "spotify-api.js"
import { providers } from "./providers"

const imageElement = document.getElementById("image") as HTMLImageElement
const titleElement = document.getElementById("title") as HTMLHeadingElement
const descriptionElement = document.getElementById("description") as HTMLParagraphElement

const tracksContainer = document.getElementById("tracks") as HTMLDivElement
const trackTemplate = document.getElementById("track-template") as HTMLAnchorElement

const url = new URL(location.href)
const type = url.searchParams.get("type")
const id = url.searchParams.get("id")
if (!type || !id) {
    document.body.innerHTML = "Invalid parameters"
    throw new Error("Invalid parameters")
}

function formatDuration(duration: number) {
    const minutes = Math.floor(duration / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

function createTrack(options: {
    number: number,
    id: string,
    name: string,
    artists: string,
    duration: number
}) {

    const track = trackTemplate.cloneNode(true) as HTMLAnchorElement
    const numberElement = track.children[0] as HTMLSpanElement
    const nameElement = track.children[1] as HTMLSpanElement
    const artistsElement = track.children[3] as HTMLSpanElement
    const durationElement = track.children[5] as HTMLSpanElement

    numberElement.innerText = options.number.toString()
    nameElement.innerText = options.name
    artistsElement.innerText = options.artists
    durationElement.innerText = formatDuration(options.duration)

    track.removeAttribute("hidden")

    track.href = `/view?type=track&id=${options.id}`

    tracksContainer.appendChild(track)
}

fetch(`/api/info/${type}/${id}`).then(res => res.json()).then(async (data) => {
    switch (type) {
        case "track": {
            const track = data as Track
            imageElement.src = track.album!.images[0].url
            titleElement.innerText = track.name
            descriptionElement.innerText = `${track.artists.map(artist => artist.name).join(", ")} • ${track.album!.name}`
            break
        }
        case "album": {
            const album = data as Album
            imageElement.src = album.images[0].url
            titleElement.innerText = album.name
            descriptionElement.innerText = album.artists.map(artist => artist.name).join(", ")

            album.tracks!.forEach((track, index) => {
                createTrack({
                    number: index + 1,
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map(artist => artist.name).join(", "),
                    duration: track.duration
                })
            })

            break

        }
        case "artist": {
            const artist = data as Artist
            imageElement.src = artist.images![0].url
            titleElement.innerText = artist.name
            descriptionElement.innerText = artist.genres!.join(", ")
            break
        }
        case "playlist": {
            const playlist = data as Playlist
            imageElement.src = playlist.images[0].url
            titleElement.innerText = playlist.name
            descriptionElement.innerText = playlist.description!

            // need to fetch tracks


            break
        }
    }
})

const providerTypes = ["track", "album", "artist"]
const providerList = document.getElementById("providerlist") as HTMLDivElement

if (providerTypes.includes(type)) {
    Object.keys(providers).forEach(providerName => {

        if (providerName == "fixSpotify") return;

        const provider = providers[providerName];
        const providerElement = document.createElement("a");
        providerElement.className = "provider";
        providerElement.setAttribute("style", `---color: ${provider.color}`);
        providerElement.innerHTML = [
            `<img height="32" width="32" src="https://cdn.simpleicons.org/${provider.icon}/${provider.color.replace("#", "")}"></i>`,
            `<p>${provider.name}</p>`,
            provider.disabled ? `<p>Coming soon!</p>` : ""
        ].join("");

        if (provider.disabled) {
            providerElement.classList.add("disabled");
        } else {
            providerElement.href = `/redirect/${providerName}/${type}/${id}`
        }

        providerList.appendChild(providerElement);
    })
}
