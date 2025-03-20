import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// MongoDB connection details
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/fwendly";

// Import models
import Course from "./modules/course/model.js";
import Event from "./modules/event/model.js";
import EventType from "./modules/event-type/model.js"; // Corrected path
import FreeSlot from "./modules/free-slot/model.js"; // Corrected path
import Interest from "./modules/interest/model.js"; // Corrected path
import StudentType from "./modules/student-type/model.js"; // Corrected path
import Tag from "./modules/tag/model.js"; // Corrected path
import Unit from "./modules/unit/model.js"; // Corrected path
import User from "./modules/user/model.js";

// Hashing password function
const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

async function generateDummyData() {
	try {
		await mongoose.connect(uri);
		console.log("Connected to MongoDB using Mongoose");

		// Clear existing collections to avoid duplicates
		await User.deleteMany({});
		await Event.deleteMany({});
		await Course.deleteMany({});
		await Unit.deleteMany({});
		await Interest.deleteMany({});
		await StudentType.deleteMany({});
		await EventType.deleteMany({});
		await Tag.deleteMany({});
		await FreeSlot.deleteMany({});

		console.log("Existing data cleared");

		// Generate data for each collection
		const courses = await generateCourses();
		const studentTypes = await generateStudentTypes();
		const interests = await generateInterests();
		const units = await generateUnits();
		const freeSlots = await generateFreeSlots();
		const tags = await generateTags();
		const eventTypes = await generateEventTypes();
		const users = await generateUsers(courses);
		const events = await generateEvents(users, eventTypes, tags);

		// Connect users with data
		await connectUsersWithData(
			users,
			courses,
			units,
			interests,
			studentTypes,
			freeSlots
		);

		// Create followers/following relationships
		await createFollowRelationships(users);

		// Create event participants
		await createEventParticipants(events, users);

		console.log("All dummy data created successfully!");
	} catch (error) {
		console.error("Error generating dummy data:", error);
	} finally {
		await mongoose.disconnect();
		console.log("MongoDB connection closed");
	}
}

// Generate Courses
async function generateCourses() {
	const coursesData = [
		{ name: "Bachelor of Computer Science", code: "BCS" },
		{ name: "Bachelor of Business", code: "BBUS" },
		{ name: "Bachelor of Engineering", code: "BENG" },
		{ name: "Bachelor of Science", code: "BSC" },
		{ name: "Master of Data Science", code: "MDS" },
	];

	const courses = await Course.create(coursesData);
	console.log(`${courses.length} courses inserted`);

	return courses;
}

// Generate Units
async function generateUnits() {
	const unitsData = [
		{ name: "Introduction to Programming", code: "FIT1045" },
		{ name: "Computer Systems", code: "FIT1047" },
		{ name: "Algorithms and Data Structures", code: "FIT2004" },
		{ name: "Software Engineering Practice", code: "FIT2101" },
		{ name: "Introduction to Databases", code: "FIT1008" },
		{ name: "Operating Systems", code: "FIT2100" },
		{ name: "Networks", code: "FIT2081" },
		{ name: "IT Project Management", code: "FIT3047" },
		{ name: "Advanced Algorithms", code: "FIT3155" },
		{ name: "Software Testing", code: "FIT3077" },
	];

	const units = await Unit.create(unitsData);
	console.log(`${units.length} units inserted`);

	return units;
}

// Generate Interests
async function generateInterests() {
	const interestsData = [
		{ name: "Programming" },
		{ name: "Data Science" },
		{ name: "Artificial Intelligence" },
		{ name: "Web Development" },
		{ name: "Mobile Development" },
		{ name: "Cybersecurity" },
		{ name: "Game Development" },
		{ name: "UI/UX Design" },
		{ name: "Blockchain" },
		{ name: "Cloud Computing" },
		{ name: "Sports" },
		{ name: "Music" },
		{ name: "Art" },
		{ name: "Travel" },
		{ name: "Photography" },
	];

	const interests = await Interest.create(interestsData);
	console.log(`${interests.length} interests inserted`);

	return interests;
}

// Generate Student Types
async function generateStudentTypes() {
	const studentTypesData = [
		{ name: "Domestic" },
		{ name: "International" },
		{ name: "Transfer" },
		{ name: "Exchange" },
	];

	const studentTypes = await StudentType.create(studentTypesData);
	console.log(`${studentTypes.length} student types inserted`);

	return studentTypes;
}

// Generate Event Types
async function generateEventTypes() {
	const eventTypesData = [
		{ name: "Social Gathering" },
		{ name: "Study Group" },
		{ name: "Workshop" },
		{ name: "Seminar" },
		{ name: "Sports Event" },
		{ name: "Cultural Event" },
		{ name: "Career Fair" },
	];

	const eventTypes = await EventType.create(eventTypesData);
	console.log(`${eventTypes.length} event types inserted`);

	return eventTypes;
}

// Generate Tags
async function generateTags() {
	const tagsData = [
		{ name: "Technology" },
		{ name: "Business" },
		{ name: "Science" },
		{ name: "Arts" },
		{ name: "Health" },
		{ name: "Education" },
		{ name: "Environment" },
		{ name: "Engineering" },
		{ name: "Social" },
		{ name: "Networking" },
	];

	const tags = await Tag.create(tagsData);
	console.log(`${tags.length} tags inserted`);

	return tags;
}

// Generate Free Slots
async function generateFreeSlots() {
	const freeSlotsData = [
		// Monday slots
		{ name: "Monday 8:00 - 10:00", code: "MON_0800_1000" },
		{ name: "Monday 10:00 - 12:00", code: "MON_1000_1200" },
		{ name: "Monday 12:00 - 14:00", code: "MON_1200_1400" },
		{ name: "Monday 14:00 - 16:00", code: "MON_1400_1600" },
		{ name: "Monday 16:00 - 18:00", code: "MON_1600_1800" },
		{ name: "Monday 18:00 - 20:00", code: "MON_1800_2000" },
		// Tuesday slots
		{ name: "Tuesday 8:00 - 10:00", code: "TUE_0800_1000" },
		{ name: "Tuesday 10:00 - 12:00", code: "TUE_1000_1200" },
		{ name: "Tuesday 12:00 - 14:00", code: "TUE_1200_1400" },
		{ name: "Tuesday 14:00 - 16:00", code: "TUE_1400_1600" },
		{ name: "Tuesday 16:00 - 18:00", code: "TUE_1600_1800" },
		{ name: "Tuesday 18:00 - 20:00", code: "TUE_1800_2000" },
		// Wednesday slots
		{ name: "Wednesday 8:00 - 10:00", code: "WED_0800_1000" },
		{ name: "Wednesday 10:00 - 12:00", code: "WED_1000_1200" },
		{ name: "Wednesday 12:00 - 14:00", code: "WED_1200_1400" },
		{ name: "Wednesday 14:00 - 16:00", code: "WED_1400_1600" },
		{ name: "Wednesday 16:00 - 18:00", code: "WED_1600_1800" },
		{ name: "Wednesday 18:00 - 20:00", code: "WED_1800_2000" },
		// Thursday slots
		{ name: "Thursday 8:00 - 10:00", code: "THU_0800_1000" },
		{ name: "Thursday 10:00 - 12:00", code: "THU_1000_1200" },
		{ name: "Thursday 12:00 - 14:00", code: "THU_1200_1400" },
		{ name: "Thursday 14:00 - 16:00", code: "THU_1400_1600" },
		{ name: "Thursday 16:00 - 18:00", code: "THU_1600_1800" },
		{ name: "Thursday 18:00 - 20:00", code: "THU_1800_2000" },
		// Friday slots
		{ name: "Friday 8:00 - 10:00", code: "FRI_0800_1000" },
		{ name: "Friday 10:00 - 12:00", code: "FRI_1000_1200" },
		{ name: "Friday 12:00 - 14:00", code: "FRI_1200_1400" },
		{ name: "Friday 14:00 - 16:00", code: "FRI_1400_1600" },
		{ name: "Friday 16:00 - 18:00", code: "FRI_1600_1800" },
		{ name: "Friday 18:00 - 20:00", code: "FRI_1800_2000" },
	];

	const freeSlots = await FreeSlot.create(freeSlotsData);
	console.log(`${freeSlots.length} free slots inserted`);

	return freeSlots;
}

// Generate Users
async function generateUsers(courses) {
	// Find course IDs
	const courseMap = {};
	for (const course of courses) {
		courseMap[course.name] = course._id;
	}

	const usersData = [
		{
			name: "John Smith",
			email: "john.smith@student.monash.edu",
			hashedPassword: await hashPassword("password123"),
			course: courseMap["Bachelor of Computer Science"],
			startYear: 2021,
			endYear: 2024,
			studentType: [],
			interests: [],
			units: [],
			freeSlots: [],
			followers: [],
			following: [],
			eventsHosted: [],
			eventsAttended: [],
		},
		{
			name: "Emma Johnson",
			email: "emma.johnson@student.monash.edu",
			hashedPassword: await hashPassword("password123"),
			course: courseMap["Bachelor of Business"],
			startYear: 2022,
			endYear: 2025,
			studentType: [],
			interests: [],
			units: [],
			freeSlots: [],
			followers: [],
			following: [],
			eventsHosted: [],
			eventsAttended: [],
		},
		{
			name: "Wei Chen",
			email: "wei.chen@student.monash.edu",
			hashedPassword: await hashPassword("password123"),
			course: courseMap["Bachelor of Engineering"],
			startYear: 2020,
			endYear: 2024,
			studentType: [],
			interests: [],
			units: [],
			freeSlots: [],
			followers: [],
			following: [],
			eventsHosted: [],
			eventsAttended: [],
		},
		{
			name: "Sarah Lee",
			email: "sarah.lee@student.monash.edu",
			hashedPassword: await hashPassword("password123"),
			course: courseMap["Bachelor of Science"],
			startYear: 2022,
			endYear: 2025,
			studentType: [],
			interests: [],
			units: [],
			freeSlots: [],
			followers: [],
			following: [],
			eventsHosted: [],
			eventsAttended: [],
		},
		{
			name: "Ahmed Khan",
			email: "ahmed.khan@student.monash.edu",
			hashedPassword: await hashPassword("password123"),
			course: courseMap["Master of Data Science"],
			startYear: 2023,
			endYear: 2025,
			studentType: [],
			interests: [],
			units: [],
			freeSlots: [],
			followers: [],
			following: [],
			eventsHosted: [],
			eventsAttended: [],
		},
	];

	const users = await User.create(usersData);
	console.log(`${users.length} users inserted`);

	return users;
}

// Generate Events
async function generateEvents(users, eventTypes, tags) {
	// Future dates for events
	const today = new Date();
	const nextWeek = new Date(today);
	nextWeek.setDate(today.getDate() + 7);

	const nextMonth = new Date(today);
	nextMonth.setDate(today.getDate() + 30);

	// Past date for completed event
	const lastWeek = new Date(today);
	lastWeek.setDate(today.getDate() - 7);

	// Map event types to their IDs
	const eventTypeMap = {};
	eventTypes.forEach((type) => {
		eventTypeMap[type.name] = type._id;
	});

	// Map tags to their IDs
	const tagMap = {};
	tags.forEach((tag) => {
		tagMap[tag.name] = tag._id;
	});

	const eventsData = [
		{
			name: "Programming Workshop",
			venue: "Learning and Teaching Building, Monash Clayton",
			time: nextWeek,
			host: users[0]._id,
			type: eventTypeMap["Workshop"],
			durationMinutes: 120,
			tags: [tagMap["Technology"], tagMap["Education"]],
			participants: [],
			comments: [],
			isEnded: false,
			rating: 0,
		},
		{
			name: "Business Networking Night",
			venue: "Monash Business School",
			time: nextMonth,
			host: users[1]._id,
			type: eventTypeMap["Social Gathering"],
			durationMinutes: 180,
			tags: [tagMap["Business"], tagMap["Networking"]],
			participants: [],
			comments: [],
			isEnded: false,
			rating: 0,
		},
		{
			name: "Data Science Seminar",
			venue: "Science Building, Room S101",
			time: new Date(nextWeek.getTime() + 86400000 * 2), // 2 days after next week
			host: users[4]._id,
			type: eventTypeMap["Seminar"],
			durationMinutes: 90,
			tags: [tagMap["Technology"], tagMap["Science"], tagMap["Education"]],
			participants: [],
			comments: [],
			isEnded: false,
			rating: 0,
		},
		{
			name: "International Students Meetup",
			venue: "Campus Center",
			time: new Date(nextWeek.getTime() + 86400000 * 4), // 4 days after next week
			host: users[2]._id,
			type: eventTypeMap["Social Gathering"],
			durationMinutes: 120,
			tags: [tagMap["Social"], tagMap["Networking"]],
			participants: [],
			comments: [],
			isEnded: false,
			rating: 0,
		},
		{
			name: "Science Study Group",
			venue: "Library, Study Room 3",
			time: lastWeek,
			host: users[3]._id,
			type: eventTypeMap["Study Group"],
			durationMinutes: 120,
			tags: [tagMap["Science"], tagMap["Education"]],
			participants: [],
			comments: [],
			isEnded: true,
			rating: 4.5,
		},
	];

	const events = await Event.create(eventsData);
	console.log(`${events.length} events inserted`);

	// Update event types with their events and add events to user's hosted events
	for (let i = 0; i < events.length; i++) {
		const event = events[i];
		const eventData = eventsData[i];

		// Add event to eventType's events array
		await EventType.findByIdAndUpdate(eventData.type, {
			$push: { events: event._id },
		});

		// Add to user's hosted events
		await User.findByIdAndUpdate(eventData.host, {
			$push: { eventsHosted: event._id },
		});
	}

	return events;
}

// Connect users with related data
async function connectUsersWithData(
	users,
	courses,
	units,
	interests,
	studentTypes,
	freeSlots
) {
	// Create mappings for easier lookup
	const interestMap = {};
	interests.forEach((interest) => {
		interestMap[interest.name] = interest._id;
	});

	const unitMap = {};
	units.forEach((unit) => {
		unitMap[unit.code] = unit._id;
	});

	const freeSlotMap = {};
	freeSlots.forEach((slot) => {
		freeSlotMap[slot.code] = slot._id;
	});

	const studentTypeMap = {};
	studentTypes.forEach((type) => {
		studentTypeMap[type.name] = type._id;
	});

	const userInterests = [
		{
			user: users[0],
			interestNames: [
				"Programming",
				"Web Development",
				"Artificial Intelligence",
			],
			unitCodes: ["FIT1045", "FIT2004", "FIT1008"],
			freeSlotCodes: ["MON_AM", "WED_PM", "FRI_AM"],
			studentTypes: ["Domestic"],
		},
		{
			user: users[1],
			interestNames: ["Business", "Social", "Travel"],
			unitCodes: ["FIT2081", "FIT3047"],
			freeSlotCodes: ["TUE_AM", "THU_PM"],
			studentTypes: ["Domestic"],
		},
		{
			user: users[2],
			interestNames: ["Engineering", "Technology", "Photography"],
			unitCodes: ["FIT1047", "FIT2100"],
			freeSlotCodes: ["MON_PM", "WED_AM", "FRI_PM"],
			studentTypes: ["International"],
		},
		{
			user: users[3],
			interestNames: ["Science", "Environment", "Sports"],
			unitCodes: ["FIT2004", "FIT3077"],
			freeSlotCodes: ["TUE_PM", "THU_AM"],
			studentTypes: ["Domestic"],
		},
		{
			user: users[4],
			interestNames: [
				"Data Science",
				"Artificial Intelligence",
				"Cloud Computing",
			],
			unitCodes: ["FIT1008", "FIT3155"],
			freeSlotCodes: ["MON_AM", "WED_AM", "FRI_PM"],
			studentTypes: ["International"],
		},
	];

	for (const userInfo of userInterests) {
		// Get interest IDs
		const userInterestIds = userInfo.interestNames
			.map((name) => interestMap[name])
			.filter((id) => id);

		// Get unit IDs
		const userUnitIds = userInfo.unitCodes
			.map((code) => unitMap[code])
			.filter((id) => id);

		// Get free slot IDs
		const userFreeSlotIds = userInfo.freeSlotCodes
			.map((code) => freeSlotMap[code])
			.filter((id) => id);

		// Get student type IDs
		const userStudentTypeIds = userInfo.studentTypes
			.map((name) => studentTypeMap[name])
			.filter((id) => id);

		// Update user
		await User.findByIdAndUpdate(userInfo.user._id, {
			interests: userInterestIds,
			units: userUnitIds,
			freeSlots: userFreeSlotIds,
			studentType: userStudentTypeIds,
		});

		// Update units with this user
		for (const unitId of userUnitIds) {
			await Unit.findByIdAndUpdate(unitId, {
				$addToSet: { people: userInfo.user._id },
			});
		}
	}

	console.log("Users have been updated with related data");
}

// Create follow relationships between users
async function createFollowRelationships(users) {
	const relationships = [
		{ follower: users[0], following: users[1] },
		{ follower: users[0], following: users[2] },
		{ follower: users[1], following: users[0] },
		{ follower: users[1], following: users[3] },
		{ follower: users[2], following: users[4] },
		{ follower: users[3], following: users[0] },
		{ follower: users[3], following: users[4] },
		{ follower: users[4], following: users[2] },
	];

	for (const rel of relationships) {
		// Add to follower's following list
		await User.findByIdAndUpdate(rel.follower._id, {
			$addToSet: { following: rel.following._id },
		});

		// Add to following's followers list
		await User.findByIdAndUpdate(rel.following._id, {
			$addToSet: { followers: rel.follower._id },
		});
	}

	console.log("Follow relationships created");
}

// Add participants to events
async function createEventParticipants(events, users) {
	const participations = [
		{ event: events[0], participants: [users[1], users[2], users[3]] },
		{ event: events[1], participants: [users[0], users[3], users[4]] },
		{ event: events[2], participants: [users[0], users[1], users[2]] },
		{
			event: events[3],
			participants: [users[0], users[1], users[3], users[4]],
		},
		{
			event: events[4],
			participants: [users[0], users[1], users[2], users[4]],
		},
	];

	for (const participation of participations) {
		const participantIds = participation.participants.map((user) => user._id);

		// Add participants to event
		await Event.findByIdAndUpdate(participation.event._id, {
			$addToSet: { participants: { $each: participantIds } },
		});

		// Add event to each user's attended events
		for (const user of participation.participants) {
			await User.findByIdAndUpdate(user._id, {
				$addToSet: { eventsAttended: participation.event._id },
			});
		}
	}

	console.log("Event participants added");
}

// Function to remove all generated data
async function cleanupDummyData() {
	try {
		await mongoose.connect(uri);
		console.log("Connected to MongoDB for cleanup");

		// Clear collections
		await User.deleteMany({});
		await Event.deleteMany({});
		await Course.deleteMany({});
		await Unit.deleteMany({});
		await Interest.deleteMany({});
		await StudentType.deleteMany({});
		await EventType.deleteMany({});
		await Tag.deleteMany({});
		await FreeSlot.deleteMany({});

		console.log("All dummy data cleaned up!");
	} catch (error) {
		console.error("Error cleaning up dummy data:", error);
	} finally {
		await mongoose.disconnect();
		console.log("MongoDB connection closed");
	}
}

// Execute the function to generate data
generateDummyData();

// Uncomment this line to clean up all data instead of generating it
// cleanupDummyData();

/*
DUMMY DATA SUMMARY:

Users (5):
- John Smith (Domestic, Computer Science)
- Emma Johnson (Domestic, Business)
- Wei Chen (International, Engineering)
- Sarah Lee (Domestic, Science)
- Ahmed Khan (International, Data Science)

Courses (5):
- Bachelor of Computer Science (BCS)
- Bachelor of Business (BBUS)
- Bachelor of Engineering (BENG)
- Bachelor of Science (BSC)
- Master of Data Science (MDS)

Units (10):
- FIT1045: Introduction to Programming
- FIT1047: Computer Systems
- FIT2004: Algorithms and Data Structures
- FIT2101: Software Engineering Practice
- FIT1008: Introduction to Databases
- FIT2100: Operating Systems
- FIT2081: Networks
- FIT3047: IT Project Management
- FIT3155: Advanced Algorithms
- FIT3077: Software Testing

Interests (15):
- Programming, Data Science, Artificial Intelligence, Web Development, Mobile Development
- Cybersecurity, Game Development, UI/UX Design, Blockchain, Cloud Computing
- Sports, Music, Art, Travel, Photography

Student Types (4):
- Domestic, International, Transfer, Exchange

Event Types (7):
- Social Gathering, Study Group, Workshop, Seminar, Sports Event, Cultural Event, Career Fair

Tags (10):
- Technology, Business, Science, Arts, Health, Education, Environment, Engineering, Social, Networking

Free Slots (10):
- Monday to Friday, Morning and Afternoon slots

Events (5):
- Programming Workshop (Upcoming, hosted by John)
- Business Networking Night (Upcoming, hosted by Emma)
- Data Science Seminar (Upcoming, hosted by Ahmed)
- International Students Meetup (Upcoming, hosted by Wei)
- Science Study Group (Completed, hosted by Sarah)

Relationships:
- Follow relationships between multiple users
- Each event has multiple participants
*/
