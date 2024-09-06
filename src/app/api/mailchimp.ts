import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const listId = "2d31c29b68";

  const reader = request.body?.getReader();
  const value = (await reader?.read())?.value;
  const newValue = JSON.parse(new TextDecoder().decode(value));

  try {
    const {
      data: { members },
    } = await axios.get(
      `https://us18.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Object.fromEntries(request.headers.entries())
            .authorization,
        },
        // httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Ignore SSL certificate validation
      }
    );

    const foundMember =
      newValue &&
      members.find(
        (member: { email_address: string; }) => member.email_address === newValue["email_address"]
      );

    if (foundMember) {
      const response = await axios.put(
        `https://us18.api.mailchimp.com/3.0/lists/${listId}/members/${foundMember.id}?skip_merge_validation=false`,
        {
          ...foundMember,
          tags: [...foundMember.tags, newValue.tags],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: Object.fromEntries(request.headers.entries())
              .authorization,
          },
          // httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Ignore SSL certificate validation
        }
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      return new NextResponse(JSON.stringify(response.data));
    } else {
      const response = await axios.post(
        `https://us18.api.mailchimp.com/3.0/lists/${listId}/members?skip_merge_validation=false`,
        newValue,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: Object.fromEntries(request.headers.entries())
              .authorization,
          },
          // httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Ignore SSL certificate validation
        }
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      return new NextResponse(JSON.stringify(response.data));
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}
