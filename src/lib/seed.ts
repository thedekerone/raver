import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const events = [
    {
        title: "Helsinki Tech Symposium",
        bgImageUrl:
            "https://firebasestorage.googleapis.com/v0/b/raver-3aec7.appspot.com/o/5a6bccf8ff846b0001f03994_FeaturedImage48.jpg?alt=media&token=563a477b-a7f2-4c33-bbd8-66b0b0c7210b",
        description:
            "A gathering of the brightest minds in the Helsinki tech scene.",
    },
    {
        title: "Cloud Infrastructure Conference",
        bgImageUrl:
            "https://firebasestorage.googleapis.com/v0/b/raver-3aec7.appspot.com/o/closing-parties-ibiza-2018.jpg?alt=media&token=0f11aa2e-c6ec-4729-9283-9d3d4db223e7",
        description: "Explore the future of cloud infrastructure and services.",
    },
    {
        title: "Holi Festival of Colors",
        bgImageUrl:
            "https://firebasestorage.googleapis.com/v0/b/raver-3aec7.appspot.com/o/d1c51649-cd92-4a82-859e-dba7687262b2.sized-1000x1000.jpeg?alt=media&token=539f51ba-54c3-4f3e-9171-965e81096f70",
        description:
            "Celebrate the festival of colors with music, dance, and festivities.",
    },
    {
        title: "Indie Game Developers Meetup",
        bgImageUrl:
            "https://firebasestorage.googleapis.com/v0/b/raver-3aec7.appspot.com/o/download%20(1).jpeg?alt=media&token=1334bd24-365f-44d3-a978-4fe637d0d226",
        description:
            "Join fellow game developers to showcase and discuss indie games.",
    },
    {
        title: "Mighty Hoopla Music Festival",
        bgImageUrl:
            "https://firebasestorage.googleapis.com/v0/b/raver-3aec7.appspot.com/o/images.jpeg?alt=media&token=f0dbf39a-7ae0-4a11-85c8-39880b118f2a",
        description:
            "The most inclusive and fabulous pop festival in Helsinki.",
    },
    {
        title: "Weekend Festival 2023",
        bgImageUrl:
            "https://firebasestorage.googleapis.com/v0/b/raver-3aec7.appspot.com/o/pim-myten-m41k1lTzjVM-unsplash(1).jpg?alt=media&token=94eec4aa-7062-4e06-bca4-730af14251c4",
        description:
            "Experience the best of electronic music over an unforgettable weekend.",
    },
    {
        title: "Photography Workshop",
        bgImageUrl:
            "https://firebasestorage.googleapis.com/v0/b/raver-3aec7.appspot.com/o/4-parties.jpg?alt=media&token=668ffb55-bbff-4618-8f45-7ece0dff9396",
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

        const event = await prisma.event.create({
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

        await createTicketTypes(event.id);
    }

    await prisma.$disconnect();
};

async function createTicketTypes(eventId: string) {
    const ticketTypesData = [
        {
            name: "General Admission",
            price: 59.99,
            quantity: 500,
            description: "Access to all general areas.",
        },
        {
            name: "VIP Pass",
            price: 149.99,
            quantity: 100,
            description: "VIP access to the event, including premium seating.",
        },
        {
            name: "Group Ticket",
            price: 199.99,
            quantity: 50,
            description: "Discounted rate for groups of 5 or more.",
        },
    ];

    for (const ticketType of ticketTypesData) {
        await prisma.ticketType.create({
            data: {
                event: {
                    connect: { id: eventId },
                },
                price: ticketType.price,
                quantity: ticketType.quantity,
                name: ticketType.name,
                description: ticketType.description,
            },
        });
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
