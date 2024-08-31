/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "reference to : {\n   \"time\": 1550476186479,\n   \"blocks\": [\n      {\n         \"id\": \"oUq2g_tl8y\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Editor.js\",\n            \"level\": 2\n         }\n      },\n      {\n         \"id\": \"zbGZFPM-iI\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.\"\n         }\n      },\n      {\n         \"id\": \"qYIGsjS5rt\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Key features\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"XV87kJS_H1\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"It is a block-styled editor\",\n               \"It returns clean data output in JSON\",\n               \"Designed to be extendable and pluggable with a simple API\"\n            ]\n         }\n      },\n      {\n         \"id\": \"AOulAjL8XM\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"What does it mean «block-styled editor»\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"cyZjplMOZ0\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\\"cdx-marker\\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.\"\n         }\n      }\n   ],\n   \"version\": \"2.8.1\"\n} \n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"time\": 1686761643341,\n  \"blocks\": [\n    {\n      \"id\": \"h4bX-k-j4\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Grocery List\",\n        \"level\": 1\n      }\n    },\n    {\n      \"id\": \"i21m-j432\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Here's your grocery list. Check items off as you buy them.\"\n      }\n    },\n    {\n      \"id\": \"a52m-g234\",\n      \"type\": \"list\",\n      \"data\": {\n        \"style\": \"unordered\",\n        \"items\": [\n          \"Milk\",\n          \"Eggs\",\n          \"Bread\",\n          \"Cheese\",\n          \"Tomatoes\",\n          \"Onions\"\n        ]\n      }\n    },\n    {\n      \"id\": \"c32g-4532\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Happy shopping!\"\n      }\n    }\n  ],\n  \"version\": \"2.26.0\"\n}\n```\n\nThis JSON template represents a simple grocery list using Editor.js. It includes:\n\n* **A level 1 header:** \"Grocery List\"\n* **A paragraph:** Explains the purpose of the list.\n* **An unordered list:**  Contains grocery items.\n* **Another paragraph:**  A closing message.\n\nYou can easily adapt this template by:\n\n* **Changing the list items:** Add or remove items as needed.\n* **Adding more blocks:**  Include headers, paragraphs, or other block types to make the list more detailed.\n* **Using other block types:** Experiment with different Editor.js block types (e.g., code blocks, tables, images) to enhance your grocery list. \n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());