import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const events = [
    {
        title: "Helsinki Tech Symposium",
        bgImageUrl:
            "https://dekker2.blob.core.windows.net/events/16702606285857.jpg",
        description:
            "A gathering of the brightest minds in the Helsinki tech scene.",
    },
    {
        title: "Cloud Infrastructure Conference",
        bgImageUrl:
            "https://dekker2.blob.core.windows.net/events/462ca7fc-e597-46e7-be52-bfec3e79bdc3-file",
        description: "Explore the future of cloud infrastructure and services.",
    },
    {
        title: "Holi Festival of Colors",
        bgImageUrl:
            "https://dekker2.blob.core.windows.net/events/720666eda63498b03a2d7c001Hero-Holi-Festival-India (1).jpg",
        description:
            "Celebrate the festival of colors with music, dance, and festivities.",
    },
    {
        title: "Indie Game Developers Meetup",
        bgImageUrl:
            "https://dekker2.blob.core.windows.net/events/720666eda63498b03a2d7c005Makanaky.jpg",
        description:
            "Join fellow game developers to showcase and discuss indie games.",
    },
    {
        title: "Mighty Hoopla Music Festival",
        bgImageUrl:
            "https://dekker2.blob.core.windows.net/events/Mighty-Hoopla-1-1466x854.jpg",
        description:
            "The most inclusive and fabulous pop festival in Helsinki.",
    },
    {
        title: "Weekend Festival 2023",
        bgImageUrl:
            "https://dekker2.blob.core.windows.net/events/WKND23_Day2_224704_HeikkiSalonen_-1-e1691271395858.jpg",
        description:
            "Experience the best of electronic music over an unforgettable weekend.",
    },
    {
        title: "Photography Workshop",
        bgImageUrl:
            "https://dekker2.blob.core.windows.net/events/a5d067d211bb37d54b3946a12a5d067d211bb37d54b3946a08a0271772917_2.jpg",
        description:
            "Learn the art of photography from experienced professionals.",
    },
];

const main = async () => {
    // Example Organiser Data
    const organiser = await prisma.user.create({
        data: {
            name: "EventPro Organisers",
            email: "info@eventpro.org",
            userType: "ORGANISER",
        },
    });

    // Iterate over the events array to create events
    for (const eventInfo of events) {
        const location = await prisma.location.create({
            data: {
                name: `${eventInfo.title} Venue`,
                address: "Main street 1",
                city: "Helsinki",
                country: "Finland",
                postCode: "00100",
            },
        });

        const marketing = await prisma.marketing.create({
            data: {
                socialShareText: `Join us for ${eventInfo.title}!`,
            },
        });

        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 30); // Start date 30 days from now
        const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000); // 6 hours later

        await prisma.event.create({
            data: {
                title: eventInfo.title,
                description: eventInfo.description,
                organiserId: organiser.id,
                marketingId: marketing.id,
                locationId: location.id,
                startDate,
                endDate,
                bgImageUrl: eventInfo.bgImageUrl,
                thumbnailImageUrl: eventInfo.bgImageUrl, // Assuming the same URL for thumbnail
                // More fields can be added here if necessary
            },
        });
    }
    await prisma.$disconnect();
};

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
