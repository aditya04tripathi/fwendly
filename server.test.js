import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Configuration
const API_URL = "http://localhost:6969/api";
const api = axios.create({ baseURL: API_URL });

// Global test data repository
const testData = {
	users: [],
	courses: [],
	units: [],
	tags: [],
	studentTypes: [],
	interests: [],
	freeSlots: [],
	events: [],
	eventTypes: [], // Add event types array
};

// Utility functions
const generateUniqueString = () =>
	`test_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

// Log section headers for better readability
const logSectionHeader = (section) => {
	console.log("\n" + "=".repeat(80));
	console.log(`${section}`);
	console.log("=".repeat(80) + "\n");
};

// Log test steps
const logStep = (step) => {
	console.log("\n" + "-".repeat(40));
	console.log(`STEP: ${step}`);
	console.log("-".repeat(40) + "\n");
};

// Test Users Module
const testUsersModule = async () => {
	logSectionHeader("TESTING USERS MODULE");

	// Create user
	logStep("Creating a test user");
	try {
		const testUser = {
			name: `Test User ${generateUniqueString()}`,
			email: `user_${generateUniqueString()}@example.com`,
			password: "password123",
		};

		console.log("Sending user creation request with data:", testUser);
		const createResponse = await api.post("/users", testUser);
		console.log("User creation response:", createResponse.data);

		const userId = createResponse.data.msg._id;
		console.log("Created user with ID:", userId);
		testData.users.push(userId);

		// Get user
		logStep("Getting the created user");
		console.log("Fetching user with ID:", userId);
		const getResponse = await api.get(`/users/${userId}`);
		console.log("User details:", getResponse.data);

		// Update user
		logStep("Updating the user");
		const updateData = {
			name: `Updated User ${generateUniqueString()}`,
			startYear: 2023,
			endYear: 2027,
		};

		console.log("Updating user with data:", updateData);
		const updateResponse = await api.put(`/users/${userId}`, updateData);
		console.log("User update response:", updateResponse.data);

		// Create another user for delete test
		logStep("Creating a user to test deletion");
		const deleteTestUser = {
			name: `Delete Test User ${generateUniqueString()}`,
			email: `delete_${generateUniqueString()}@example.com`,
			password: "password123",
		};

		console.log("Creating user for deletion with data:", deleteTestUser);
		const deleteTestResponse = await api.post("/users", deleteTestUser);
		const deleteUserId = deleteTestResponse.data.msg._id;
		console.log("Created user for deletion with ID:", deleteUserId);

		// Delete user
		logStep("Deleting the user");
		console.log("Deleting user with ID:", deleteUserId);
		const deleteResponse = await api.delete(`/users/${deleteUserId}`);
		console.log("User deletion response:", deleteResponse.data);

		console.log("Users module tests completed successfully!");
	} catch (error) {
		console.error("Error in users module tests:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		throw error;
	}
};

// Test Courses Module
const testCoursesModule = async () => {
	logSectionHeader("TESTING COURSES MODULE");

	// Create course
	logStep("Creating a test course");
	try {
		const testCourse = {
			name: `Test Course ${generateUniqueString()}`,
			code: `CRSE${generateUniqueString()}`,
		};

		console.log("Sending course creation request with data:", testCourse);
		const createResponse = await api.post("/courses", testCourse);
		console.log("Course creation response:", createResponse.data);

		const courseId = createResponse.data.msg._id;
		console.log("Created course with ID:", courseId);
		testData.courses.push(courseId);

		// Get course
		logStep("Getting the created course");
		console.log("Fetching course with ID:", courseId);
		const getResponse = await api.get(`/courses/${courseId}`);
		console.log("Course details:", getResponse.data);

		// Update course
		logStep("Updating the course");
		const updateData = {
			name: `Updated Course ${generateUniqueString()}`,
		};

		console.log("Updating course with data:", updateData);
		const updateResponse = await api.put(`/courses/${courseId}`, updateData);
		console.log("Course update response:", updateResponse.data);

		// Create another course for delete test
		logStep("Creating a course to test deletion");
		const deleteTestCourse = {
			name: `Delete Test Course ${generateUniqueString()}`,
			code: `DEL${generateUniqueString()}`,
		};

		console.log("Creating course for deletion with data:", deleteTestCourse);
		const deleteTestResponse = await api.post("/courses", deleteTestCourse);
		const deleteCourseId = deleteTestResponse.data.msg._id;
		console.log("Created course for deletion with ID:", deleteCourseId);

		// Delete course
		logStep("Deleting the course");
		console.log("Deleting course with ID:", deleteCourseId);
		const deleteResponse = await api.delete(`/courses/${deleteCourseId}`);
		console.log("Course deletion response:", deleteResponse.data);

		console.log("Courses module tests completed successfully!");
	} catch (error) {
		console.error("Error in courses module tests:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		throw error;
	}
};

// Test Units Module
const testUnitsModule = async () => {
	logSectionHeader("TESTING UNITS MODULE");

	// Create unit
	logStep("Creating a test unit");
	try {
		const testUnit = {
			name: `Test Unit ${generateUniqueString()}`,
			code: `UNIT${generateUniqueString()}`,
		};

		console.log("Sending unit creation request with data:", testUnit);
		const createResponse = await api.post("/units", testUnit);
		console.log("Unit creation response:", createResponse.data);

		const unitId = createResponse.data.msg._id;
		console.log("Created unit with ID:", unitId);
		testData.units.push(unitId);

		// Get unit
		logStep("Getting the created unit");
		console.log("Fetching unit with ID:", unitId);
		const getResponse = await api.get(`/units/${unitId}`);
		console.log("Unit details:", getResponse.data);

		// Update unit
		logStep("Updating the unit");
		const updateData = {
			name: `Updated Unit ${generateUniqueString()}`,
		};

		console.log("Updating unit with data:", updateData);
		const updateResponse = await api.put(`/units/${unitId}`, updateData);
		console.log("Unit update response:", updateResponse.data);

		// Create another unit for delete test
		logStep("Creating a unit to test deletion");
		const deleteTestUnit = {
			name: `Delete Test Unit ${generateUniqueString()}`,
			code: `DEL${generateUniqueString()}`,
		};

		console.log("Creating unit for deletion with data:", deleteTestUnit);
		const deleteTestResponse = await api.post("/units", deleteTestUnit);
		const deleteUnitId = deleteTestResponse.data.msg._id;
		console.log("Created unit for deletion with ID:", deleteUnitId);

		// Delete unit
		logStep("Deleting the unit");
		console.log("Deleting unit with ID:", deleteUnitId);
		const deleteResponse = await api.delete(`/units/${deleteUnitId}`);
		console.log("Unit deletion response:", deleteResponse.data);

		console.log("Units module tests completed successfully!");
	} catch (error) {
		console.error("Error in units module tests:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		throw error;
	}
};

// Test Tags Module
const testTagsModule = async () => {
	logSectionHeader("TESTING TAGS MODULE");

	// Create tag
	logStep("Creating a test tag");
	try {
		const testTag = {
			name: `Test Tag ${generateUniqueString()}`,
		};

		console.log("Sending tag creation request with data:", testTag);
		const createResponse = await api.post("/tags", testTag);
		console.log("Tag creation response:", createResponse.data);

		const tagId = createResponse.data.msg._id;
		console.log("Created tag with ID:", tagId);
		testData.tags.push(tagId);

		// Get tag
		logStep("Getting the created tag");
		console.log("Fetching tag with ID:", tagId);
		const getResponse = await api.get(`/tags/${tagId}`);
		console.log("Tag details:", getResponse.data);

		// Update tag
		logStep("Updating the tag");
		const updateData = {
			name: `Updated Tag ${generateUniqueString()}`,
		};

		console.log("Updating tag with data:", updateData);
		const updateResponse = await api.put(`/tags/${tagId}`, updateData);
		console.log("Tag update response:", updateResponse.data);

		// Create another tag for delete test
		logStep("Creating a tag to test deletion");
		const deleteTestTag = {
			name: `Delete Test Tag ${generateUniqueString()}`,
		};

		console.log("Creating tag for deletion with data:", deleteTestTag);
		const deleteTestResponse = await api.post("/tags", deleteTestTag);
		const deleteTagId = deleteTestResponse.data.msg._id;
		console.log("Created tag for deletion with ID:", deleteTagId);

		// Delete tag
		logStep("Deleting the tag");
		console.log("Deleting tag with ID:", deleteTagId);
		const deleteResponse = await api.delete(`/tags/${deleteTagId}`);
		console.log("Tag deletion response:", deleteResponse.data);

		console.log("Tags module tests completed successfully!");
	} catch (error) {
		console.error("Error in tags module tests:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		throw error;
	}
};

// Test Student Types Module
const testStudentTypesModule = async () => {
	logSectionHeader("TESTING STUDENT TYPES MODULE");

	// Create student type
	logStep("Creating a test student type");
	try {
		const studentTypeOptions = [
			"Domestic",
			"International",
			"Transfer",
			"Exchange",
		];
		const randomType =
			studentTypeOptions[Math.floor(Math.random() * studentTypeOptions.length)];

		const testStudentType = {
			name: randomType,
		};

		console.log(
			"Sending student type creation request with data:",
			testStudentType
		);
		const createResponse = await api.post("/student-types", testStudentType);
		console.log("Student type creation response:", createResponse.data);

		const studentTypeId = createResponse.data.msg._id;
		console.log("Created student type with ID:", studentTypeId);
		testData.studentTypes.push(studentTypeId);

		// Get student type
		logStep("Getting the created student type");
		console.log("Fetching student type with ID:", studentTypeId);
		const getResponse = await api.get(`/student-types/${studentTypeId}`);
		console.log("Student type details:", getResponse.data);

		// Update student type
		logStep("Updating the student type");
		const nextType =
			studentTypeOptions.find((type) => type !== randomType) || "Domestic";
		const updateData = {
			name: nextType,
		};

		console.log("Updating student type with data:", updateData);
		const updateResponse = await api.put(
			`/student-types/${studentTypeId}`,
			updateData
		);
		console.log("Student type update response:", updateResponse.data);

		// Create another student type for delete test
		logStep("Creating a student type to test deletion");
		const deleteTestStudentType = {
			name:
				studentTypeOptions.find(
					(type) => type !== nextType && type !== randomType
				) || "Exchange",
		};

		console.log(
			"Creating student type for deletion with data:",
			deleteTestStudentType
		);
		const deleteTestResponse = await api.post(
			"/student-types",
			deleteTestStudentType
		);
		const deleteStudentTypeId = deleteTestResponse.data.msg._id;
		console.log(
			"Created student type for deletion with ID:",
			deleteStudentTypeId
		);

		// Delete student type
		logStep("Deleting the student type");
		console.log("Deleting student type with ID:", deleteStudentTypeId);
		const deleteResponse = await api.delete(
			`/student-types/${deleteStudentTypeId}`
		);
		console.log("Student type deletion response:", deleteResponse.data);

		console.log("Student types module tests completed successfully!");
	} catch (error) {
		console.error("Error in student types module tests:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		throw error;
	}
};

// Test Interests Module
const testInterestsModule = async () => {
	logSectionHeader("TESTING INTERESTS MODULE");

	// Create interest
	logStep("Creating a test interest");
	try {
		const testInterest = {
			name: `Test Interest ${generateUniqueString()}`,
		};

		console.log("Sending interest creation request with data:", testInterest);
		const createResponse = await api.post("/interests", testInterest);
		console.log("Interest creation response:", createResponse.data);

		const interestId = createResponse.data.msg._id;
		console.log("Created interest with ID:", interestId);
		testData.interests.push(interestId);

		// Get interest
		logStep("Getting the created interest");
		console.log("Fetching interest with ID:", interestId);
		const getResponse = await api.get(`/interests/${interestId}`);
		console.log("Interest details:", getResponse.data);

		// Update interest
		logStep("Updating the interest");
		const updateData = {
			name: `Updated Interest ${generateUniqueString()}`,
		};

		console.log("Updating interest with data:", updateData);
		const updateResponse = await api.put(
			`/interests/${interestId}`,
			updateData
		);
		console.log("Interest update response:", updateResponse.data);

		// Create another interest for delete test
		logStep("Creating an interest to test deletion");
		const deleteTestInterest = {
			name: `Delete Test Interest ${generateUniqueString()}`,
		};

		console.log(
			"Creating interest for deletion with data:",
			deleteTestInterest
		);
		const deleteTestResponse = await api.post("/interests", deleteTestInterest);
		const deleteInterestId = deleteTestResponse.data.msg._id;
		console.log("Created interest for deletion with ID:", deleteInterestId);

		// Delete interest
		logStep("Deleting the interest");
		console.log("Deleting interest with ID:", deleteInterestId);
		const deleteResponse = await api.delete(`/interests/${deleteInterestId}`);
		console.log("Interest deletion response:", deleteResponse.data);

		console.log("Interests module tests completed successfully!");
	} catch (error) {
		console.error("Error in interests module tests:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		throw error;
	}
};

// Test Free Slots Module
const testFreeSlotsModule = async () => {
	logSectionHeader("TESTING FREE SLOTS MODULE");

	// Create free slot
	logStep("Creating a test free slot");
	try {
		const testFreeSlot = {
			name: `Test Free Slot ${generateUniqueString()}`,
			code: `SLOT${generateUniqueString()}`,
		};

		console.log("Sending free slot creation request with data:", testFreeSlot);
		const createResponse = await api.post("/free-slots", testFreeSlot);
		console.log("Free slot creation response:", createResponse.data);

		const freeSlotId = createResponse.data.msg._id;
		console.log("Created free slot with ID:", freeSlotId);
		testData.freeSlots.push(freeSlotId);

		// Get free slot
		logStep("Getting the created free slot");
		console.log("Fetching free slot with ID:", freeSlotId);
		const getResponse = await api.get(`/free-slots/${freeSlotId}`);
		console.log("Free slot details:", getResponse.data);

		// Update free slot
		logStep("Updating the free slot");
		const updateData = {
			name: `Updated Free Slot ${generateUniqueString()}`,
		};

		console.log("Updating free slot with data:", updateData);
		const updateResponse = await api.put(
			`/free-slots/${freeSlotId}`,
			updateData
		);
		console.log("Free slot update response:", updateResponse.data);

		// Create another free slot for delete test
		logStep("Creating a free slot to test deletion");
		const deleteTestFreeSlot = {
			name: `Delete Test Free Slot ${generateUniqueString()}`,
			code: `DEL${generateUniqueString()}`,
		};

		console.log(
			"Creating free slot for deletion with data:",
			deleteTestFreeSlot
		);
		const deleteTestResponse = await api.post(
			"/free-slots",
			deleteTestFreeSlot
		);
		const deleteFreeSlotId = deleteTestResponse.data.msg._id;
		console.log("Created free slot for deletion with ID:", deleteFreeSlotId);

		// Delete free slot
		logStep("Deleting the free slot");
		console.log("Deleting free slot with ID:", deleteFreeSlotId);
		const deleteResponse = await api.delete(`/free-slots/${deleteFreeSlotId}`);
		console.log("Free slot deletion response:", deleteResponse.data);

		console.log("Free slots module tests completed successfully!");
	} catch (error) {
		console.error("Error in free slots module tests:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		throw error;
	}
};

// Test Events Module
const testEventsModule = async () => {
	logSectionHeader("TESTING EVENTS MODULE");

	// This test depends on having a user
	if (testData.users.length === 0) {
		console.error(
			"No test users available for events test. Creating one now..."
		);
		const testUser = {
			name: `Event Test User ${generateUniqueString()}`,
			email: `event_user_${generateUniqueString()}@example.com`,
			password: "password123",
		};

		const userResponse = await api.post("/users", testUser);
		testData.users.push(userResponse.data.msg._id);
	}

	// Create event
	logStep("Creating a test event");
	try {
		const testEvent = {
			name: `Test Event ${generateUniqueString()}`,
			venue: "Test Venue",
			time: new Date().toISOString(),
			host: testData.users[0], // Use the first test user as the host
		};

		console.log("Sending event creation request with data:", testEvent);
		const createResponse = await api.post("/events", testEvent);
		console.log("Event creation response:", createResponse.data);

		const eventId = createResponse.data.msg._id;
		console.log("Created event with ID:", eventId);
		testData.events.push(eventId);

		// Get event
		logStep("Getting the created event");
		console.log("Fetching event with ID:", eventId);
		const getResponse = await api.get(`/events/${eventId}`);
		console.log("Event details:", getResponse.data);

		// Update event
		logStep("Updating the event");
		const updateData = {
			name: `Updated Event ${generateUniqueString()}`,
			durationMinutes: 120,
			isEnded: false,
		};

		console.log("Updating event with data:", updateData);
		const updateResponse = await api.put(`/events/${eventId}`, updateData);
		console.log("Event update response:", updateResponse.data);

		// Add a comment to the event
		logStep("Adding a comment to the event");
		const commentData = {
			user: testData.users[0], // Use the first test user
			comment: `Test comment ${generateUniqueString()}`,
		};

		console.log("Adding comment with data:", commentData);
		const commentResponse = await api.post(
			`/events/${eventId}/comments`,
			commentData
		);
		console.log("Comment response:", commentResponse.data);

		// Create another event for delete test
		logStep("Creating an event to test deletion");
		const deleteTestEvent = {
			name: `Delete Test Event ${generateUniqueString()}`,
			venue: "Delete Venue",
			time: new Date().toISOString(),
			host: testData.users[0],
		};

		console.log("Creating event for deletion with data:", deleteTestEvent);
		const deleteTestResponse = await api.post("/events", deleteTestEvent);
		const deleteEventId = deleteTestResponse.data.msg._id;
		console.log("Created event for deletion with ID:", deleteEventId);

		// Delete event
		logStep("Deleting the event");
		console.log("Deleting event with ID:", deleteEventId);
		const deleteResponse = await api.delete(`/events/${deleteEventId}`);
		console.log("Event deletion response:", deleteResponse.data);

		console.log("Events module tests completed successfully!");
	} catch (error) {
		console.error("Error in events module tests:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		throw error;
	}
};

// Test Event Types Module
const testEventTypesModule = async () => {
	logSectionHeader("TESTING EVENT TYPES MODULE");

	// Create event type
	logStep("Creating a test event type");
	try {
		const testEventType = {
			name: `Test Event Type ${generateUniqueString()}`,
			description: `Description for test event type ${generateUniqueString()}`,
		};

		console.log(
			"Sending event type creation request with data:",
			testEventType
		);
		const createResponse = await api.post("/event-types", testEventType);
		console.log("Event type creation response:", createResponse.data);

		const eventTypeId = createResponse.data.msg._id;
		console.log("Created event type with ID:", eventTypeId);
		testData.eventTypes.push(eventTypeId);

		// Get event type
		logStep("Getting the created event type");
		console.log("Fetching event type with ID:", eventTypeId);
		const getResponse = await api.get(`/event-types/${eventTypeId}`);
		console.log("Event type details:", getResponse.data);

		// Update event type
		logStep("Updating the event type");
		const updateData = {
			name: `Updated Event Type ${generateUniqueString()}`,
			description: `Updated description for event type ${generateUniqueString()}`,
		};

		console.log("Updating event type with data:", updateData);
		const updateResponse = await api.put(
			`/event-types/${eventTypeId}`,
			updateData
		);
		console.log("Event type update response:", updateResponse.data);

		// Create another event type for delete test
		logStep("Creating an event type to test deletion");
		const deleteTestEventType = {
			name: `Delete Test Event Type ${generateUniqueString()}`,
			description: `Description for delete test event type ${generateUniqueString()}`,
		};

		console.log(
			"Creating event type for deletion with data:",
			deleteTestEventType
		);
		const deleteTestResponse = await api.post(
			"/event-types",
			deleteTestEventType
		);
		const deleteEventTypeId = deleteTestResponse.data.msg._id;
		console.log("Created event type for deletion with ID:", deleteEventTypeId);

		// Delete event type
		logStep("Deleting the event type");
		console.log("Deleting event type with ID:", deleteEventTypeId);
		const deleteResponse = await api.delete(
			`/event-types/${deleteEventTypeId}`
		);
		console.log("Event type deletion response:", deleteResponse.data);

		console.log("Event types module tests completed successfully!");
	} catch (error) {
		console.error("Error in event types module tests:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		throw error;
	}
};

// Clean up test data
const cleanupTestData = async () => {
	logSectionHeader("CLEANING UP TEST DATA");

	try {
		// Clean up events first (since they depend on users)
		for (const eventId of testData.events) {
			console.log(`Deleting test event: ${eventId}`);
			try {
				await api.delete(`/events/${eventId}`);
			} catch (error) {
				console.log(`Event ${eventId} may already be deleted or not found.`);
			}
		}

		// Clean up other resources
		for (const userId of testData.users) {
			console.log(`Deleting test user: ${userId}`);
			try {
				await api.delete(`/users/${userId}`);
			} catch (error) {
				console.log(`User ${userId} may already be deleted or not found.`);
			}
		}

		for (const courseId of testData.courses) {
			console.log(`Deleting test course: ${courseId}`);
			try {
				await api.delete(`/courses/${courseId}`);
			} catch (error) {
				console.log(`Course ${courseId} may already be deleted or not found.`);
			}
		}

		for (const unitId of testData.units) {
			console.log(`Deleting test unit: ${unitId}`);
			try {
				await api.delete(`/units/${unitId}`);
			} catch (error) {
				console.log(`Unit ${unitId} may already be deleted or not found.`);
			}
		}

		for (const tagId of testData.tags) {
			console.log(`Deleting test tag: ${tagId}`);
			try {
				await api.delete(`/tags/${tagId}`);
			} catch (error) {
				console.log(`Tag ${tagId} may already be deleted or not found.`);
			}
		}

		for (const studentTypeId of testData.studentTypes) {
			console.log(`Deleting test student type: ${studentTypeId}`);
			try {
				await api.delete(`/student-types/${studentTypeId}`);
			} catch (error) {
				console.log(
					`Student type ${studentTypeId} may already be deleted or not found.`
				);
			}
		}

		for (const interestId of testData.interests) {
			console.log(`Deleting test interest: ${interestId}`);
			try {
				await api.delete(`/interests/${interestId}`);
			} catch (error) {
				console.log(
					`Interest ${interestId} may already be deleted or not found.`
				);
			}
		}

		for (const freeSlotId of testData.freeSlots) {
			console.log(`Deleting test free slot: ${freeSlotId}`);
			try {
				await api.delete(`/free-slots/${freeSlotId}`);
			} catch (error) {
				console.log(
					`Free slot ${freeSlotId} may already be deleted or not found.`
				);
			}
		}

		for (const eventTypeId of testData.eventTypes) {
			console.log(`Deleting test event type: ${eventTypeId}`);
			try {
				await api.delete(`/event-types/${eventTypeId}`);
			} catch (error) {
				console.log(
					`Event type ${eventTypeId} may already be deleted or not found.`
				);
			}
		}

		console.log("Cleanup completed successfully!");
	} catch (error) {
		console.error("Error cleaning up test data:", error.message);
	}
};

// Main test function
const runTests = async () => {
	const timestamp = Date.now();
	const startTime = new Date();
	console.log(`Test suite started at: ${startTime.toISOString()}`);

	// Test tracking statistics
	const testStats = {
		total: 0,
		passed: 0,
		failed: 0,
		results: [],
	};

	// Wrap each test function to track results
	const wrapTestFunction = (fnName, fn) => async () => {
		console.log(`\nStarting test module: ${fnName}`);
		testStats.total++;
		try {
			await fn();
			testStats.passed++;
			console.log(`✅ ${fnName} module test PASSED`);
			testStats.results.push({ module: fnName, status: "PASSED" });
			return true;
		} catch (error) {
			testStats.failed++;
			console.error(`❌ ${fnName} module test FAILED: ${error.message}`);
			testStats.results.push({
				module: fnName,
				status: "FAILED",
				error: error.message,
				details: error.response?.data || "No response data",
			});
			throw error;
		}
	};

	// Store original functions
	const originalFunctions = {
		testUsersModule,
		testCoursesModule,
		testUnitsModule,
		testTagsModule,
		testStudentTypesModule,
		testInterestsModule,
		testFreeSlotsModule,
		testEventsModule,
		testEventTypesModule, // Add event types test function
	};

	// Replace with wrapped versions
	const wrappedTestUsersModule = wrapTestFunction("Users", testUsersModule);
	const wrappedTestCoursesModule = wrapTestFunction(
		"Courses",
		testCoursesModule
	);
	const wrappedTestUnitsModule = wrapTestFunction("Units", testUnitsModule);
	const wrappedTestTagsModule = wrapTestFunction("Tags", testTagsModule);
	const wrappedTestStudentTypesModule = wrapTestFunction(
		"StudentTypes",
		testStudentTypesModule
	);
	const wrappedTestInterestsModule = wrapTestFunction(
		"Interests",
		testInterestsModule
	);
	const wrappedTestFreeSlotsModule = wrapTestFunction(
		"FreeSlots",
		testFreeSlotsModule
	);
	const wrappedTestEventsModule = wrapTestFunction("Events", testEventsModule);
	const wrappedTestEventTypesModule = wrapTestFunction(
		"EventTypes",
		testEventTypesModule
	);

	logSectionHeader("STARTING FWENDLY SERVER API TEST SUITE");

	try {
		// Test users module
		await wrappedTestUsersModule();

		// Test courses module
		await wrappedTestCoursesModule();

		// Test units module
		await wrappedTestUnitsModule();

		// Test tags module
		await wrappedTestTagsModule();

		// Test student types module
		await wrappedTestStudentTypesModule();

		// Test interests module
		await wrappedTestInterestsModule();

		// Test free slots module
		await wrappedTestFreeSlotsModule();

		// Test event types module
		await wrappedTestEventTypesModule();

		// Test events module (depends on users)
		await wrappedTestEventsModule();

		// Clean up all test data
		await cleanupTestData();

		logSectionHeader("ALL TESTS COMPLETED SUCCESSFULLY!");
	} catch (error) {
		console.error("ERROR DURING TEST EXECUTION:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		console.error("Stack trace:", error.stack);

		// Try to clean up even if tests fail
		try {
			await cleanupTestData();
		} catch (cleanupError) {
			console.error("Failed to clean up test data:", cleanupError.message);
		}
	} finally {
		// Generate test report
		const endTime = new Date();
		const testDuration = (endTime - startTime) / 1000; // in seconds

		console.log(`\nTest suite completed at: ${endTime.toISOString()}`);
		console.log(`Total duration: ${testDuration.toFixed(2)} seconds`);

		const reportContent = `
FWENDLY SERVER API TEST REPORT
==============================
Generated: ${endTime.toISOString()}
Test Duration: ${testDuration.toFixed(2)} seconds

SUMMARY
-------
Total Tests: ${testStats.total}
Passed: ${testStats.passed}
Failed: ${testStats.failed}
Success Rate: ${
			testStats.total > 0
				? ((testStats.passed / testStats.total) * 100).toFixed(2)
				: 0
		}%

DETAILS
-------
${testStats.results
	.map(
		(result) =>
			`[${result.status}] ${result.module}${
				result.error ? `\n    Error: ${result.error}` : ""
			}`
	)
	.join("\n")}
`;

		// Write report to file
		try {
			const fs = await import("fs");
			const dir = "./tests";

			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}

			const filename = `${dir}/test_report_${timestamp}.txt`;
			fs.writeFileSync(filename, reportContent);
			console.log(`\nTest report written to ${filename}`);
		} catch (fsError) {
			console.error("Failed to write test report to file:", fsError.message);
			console.log("Test report content:", reportContent);
		}

		// Log summary to console
		console.log("\n==== TEST SUMMARY ====");
		console.log(`Tests run: ${testStats.total}`);
		console.log(`Tests passed: ${testStats.passed}`);
		console.log(`Tests failed: ${testStats.failed}`);
		console.log(
			`Success rate: ${
				testStats.total > 0
					? ((testStats.passed / testStats.total) * 100).toFixed(2)
					: 0
			}%`
		);
	}
};

runTests();
