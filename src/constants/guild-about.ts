export const GUILD_FAMILY_PHOTOS = [
  {
    id: "mov-1",
    src: "/parnets/mov-1.mp4",
    alt: "蔚藍天際公會影片",
    width: 1986,
    height: 1320,
  },
  {
    id: "family-1",
    src: "/parnets/family-1.png",
    alt: "蔚藍天際成員在海邊夕陽下的合照",
    width: 2560,
    height: 1440,
  },
  {
    id: "family-2",
    src: "/parnets/family-2.png",
    alt: "蔚藍天際成員在海邊白天的合照",
    width: 2560,
    height: 1351,
  },{
    id: "comedy",
    src: "/parnets/comedy.mp4",
    alt: "蔚藍天際公會出現了大老鼠！",
    width: 1280,
    height: 720,
  },
  {
    id: "night market",
    src: "/parnets/night market.png",
    alt: "在夜市裡與大家的家樂福",
    width: 2560,
    height: 1440,
  },
  {
    id: "night market-2",
    src: "/parnets/night market-2.png",
    alt: "在夜市裡與大家互動",
    width: 2560,
    height: 1440,
  },{
    id: "party",
    src: "/parnets/birthday-party.mp4",
    alt: "蔚藍天際公會的生日派對",
    width: 854,
    height: 480,
  },
] as const;

const familyVideo = GUILD_FAMILY_PHOTOS.find((photo) => photo.src.endsWith(".mp4"));
const familyVideoAspect = familyVideo
  ? familyVideo.width / familyVideo.height
  : 1;
const familyVideoSlidePercent = 73;
const GUILD_FAMILY_PHOTO_AUTOPLAY_MS = 8000;

function guildFamilySlideWidth(photo: (typeof GUILD_FAMILY_PHOTOS)[number]) {
  const aspect = photo.width / photo.height;

  return (familyVideoSlidePercent * aspect) / familyVideoAspect;
}

function guildFamilySlides() {
  return [0, 1].flatMap((copy) => GUILD_FAMILY_PHOTOS.map((photo) => ({
    key: `${photo.id}-${copy}`,
    ...photo,
  })));
}

export {
  GUILD_FAMILY_PHOTO_AUTOPLAY_MS,
  guildFamilySlideWidth,
  guildFamilySlides,
};
