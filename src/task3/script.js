//TASK 3
import mailchimp from "@mailchimp/mailchimp_marketing";
import "dotenv/config";
console.log("apikey", process.env.MAILCHIMP_APIKEY);
console.log("apikey", process.env.MAILCHIMP_SERVER);
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_APIKEY,
  server: process.env.MAILCHIMP_SERVER,
});

//3.1 Create a new list using Mailchimp's RESTful API. Free account can only have 1 list/audience
async function createList() {
  const response = await mailchimp.lists.createList({
    name: "newlist",
    permission_reminder: "permission_reminder",
    email_type_option: true,
    contact: {
      company: "Ematic",
      address1: "1 le duan",
      city: "hochiminh",
      country: "VN",
    },
    campaign_defaults: {
      from_name: "Ematic",
      from_email: "binhhoangngoc@gmail.com",
      subject: "Technology Solutions",
      language: "EN_US",
    },
  });
}
// createList();

//3.2 & 3.3 - Add your email and other valid emails to the list using Mailchimp's RESTful API
const getList = async () => {
  const response = await mailchimp.lists.getAllLists();
  const list_id = response.lists[0].id;
  return list_id; //in order to add emails to the list, u need list_id
};

const addEmails = async () => {
  const list_id = await getList(); //get the list_id u want to add emails/contacts
  const response = await mailchimp.lists.addListMember(list_id, {
    email_address: "binhhoangngoc14@gmail.com", //emails to be added to the list
    status: "subscribed",
    merge_fields: {
      FNAME: "binh14",
      LNAME: "nguyen",
      ADDRESS: "3 nguyen hue",
    },
  });
};
// addEmails();

//3.4 Update the user profile field of the existing subscriber using Mailchimp's RESTful API
const updateMember = async () => {
  const list_id = await getList();
  const response = await mailchimp.lists.updateListMember(
    list_id,
    "binhhoangngoc7@gmail.com", //add email or contact_id of that user here
    {
      merge_fields: {
        FNAME: "binh7",
        LNAME: "nguyen",
        BIRTHDAY: "01/22",
        ADDRESS: {
          addr1: "123 le loi",
          city: "hanoi",
          state: "North Vietnam",
          zip: "118000",
          country: "VN",
        },
      },
      status: "subscribed",
    }
  );
  console.log("response", response);
};
// updateMember();

//3.5 Update one of the email address from subscribed to unsubscribed
const updateMemberEmail = async () => {
  const list_id = await getList();
  const response = await mailchimp.lists.updateListMember(
    list_id,
    "binhhoangngoc12@gmail.com", //email of a subsribed user
    {
      status: "unsubscribed", //change status from subsribed to unsubdribed
    }
  );
  console.log("unsubscribed user", response);
};
// updateMemberEmail();
