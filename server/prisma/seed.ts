import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const book1 = await prisma.book.upsert({
		where: { Id: 1 },
		update: {},
		create: {
			Title: 'The Night Circus',
			Author: 'Erin Morgenstern',
			Description:
				'In a magical competition between two young illusionists, Celia and Marco, the enchanting Night Circus serves as the stage. This mysterious circus, open only at night, captivates its visitors with mesmerizing wonders. Unbeknownst to them, the circus is merely the battleground for a deeper, high-stakes game that will determine their fate.',
			Reviews: {
				create: {
					Review: 'A spellbinding tale with richly drawn characters and a lush, atmospheric setting. Morgenstern’s prose is as enchanting as the circus itself, pulling readers into a world where magic feels real. However, the nonlinear narrative may be challenging for some.',
					Score: 5,
				},
			},
		},
	});
	const book2 = await prisma.book.upsert({
		where: { Id: 2 },
		update: {},
		create: {
			Title: 'Circe',
			Author: 'Madeline Miller',
			Description: `Circe, the daughter of the sun god Helios, is a nymph with extraordinary powers. Banished to a deserted island, she hones her skills and encounters famous figures from mythology. As she struggles with her divine and mortal heritage, Circe's journey becomes one of self-discovery, empowerment, and transformation.`,
			Reviews: {
				create: {
					Review: `Miller’s lyrical writing and deep exploration of character make "Circe" a standout. The novel blends mythology with modern themes of identity and independence. Some may find the pacing slow, but the rich detail and emotional depth are rewarding.`,
					Score: 4,
				},
			},
		},
	});
	const book3 = await prisma.book.upsert({
		where: { Id: 3 },
		update: {},
		create: {
			Title: 'Educated',
			Author: 'Tara Westover',
			Description: `This memoir tells the story of Tara Westover, who grew up in a strict, survivalist family in rural Idaho. Deprived of formal education, she eventually escapes her isolated life through self-education, leading her to earn a Ph.D. from Cambridge University. "Educated" is a powerful tale of resilience, family bonds, and the transformative power of learning.`,
			Reviews: {
				create: {
					Review: `"Educated" is a compelling and inspiring memoir that highlights the impact of education on one's life. Westover’s story is both harrowing and hopeful, though some readers may find certain aspects of her family dynamics disturbing.`,
					Score: 3,
				},
			},
		},
	});
	const book4 = await prisma.book.upsert({
		where: { Id: 4 },
		update: {},
		create: {
			Title: 'The Silent Patient',
			Author: 'Alex Michaelides',
			Description: `Alicia Berenson, a famous painter, shoots her husband and then falls into silence. Her refusal to speak turns the case into a mystery, capturing the public’s imagination. Theo Faber, a criminal psychotherapist, is determined to unravel the truth behind her silence, leading to shocking revelations.`,
			Reviews: {
				create: {
					Review: `"The Silent Patient" is a gripping psychological thriller with a twist that leaves readers stunned. Michaelides crafts a tense and suspenseful narrative that keeps you hooked until the last page. Some might feel the twist is too reliant on shock value, but it’s undeniably effective.`,
					Score: 2,
				},
			},
		},
	});
	const book5 = await prisma.book.upsert({
		where: { Id: 5 },
		update: {},
		create: {
			Title: 'The Alchemist',
			Author: 'Paulo Coelho',
			Description: `This allegorical novel follows Santiago, a shepherd boy who dreams of finding treasure in the Egyptian pyramids. Along his journey, he encounters various characters and learns profound life lessons about following one’s dreams, the importance of perseverance, and the interconnectedness of all things.`,
			Reviews: {
				create: {
					Review: `Coelho’s "The Alchemist" is a beloved modern classic that resonates with readers worldwide. Its simple yet profound message about pursuing one’s personal legend is inspiring. However, some may find the novel’s spiritual overtones too simplistic or repetitive.`,
					Score: 1,
				},
			},
		},
	});
	console.log({ book1, book2, book3, book4, book5 });
}
main()
	.then(async () => {
		console.log('Database is successully seeded');
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.log('Database seeding is not needed');
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
