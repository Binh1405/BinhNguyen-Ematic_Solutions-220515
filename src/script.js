//TASK 3
import mailchimp from "@mailchimp/mailchimp_marketing";
mailchimp.setConfig({
  apiKey: "14983c6c4aef2dd6201c8b61e8fa5942-us14",
  server: "us14",
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
    email_address: "binhhoangngoc13@gmail.com", //emails to be added to the list
    status: "unsubscribed",
    merge_fields: {
      FNAME: "binh13",
      LNAME: "nguyen",
      ADDRESS: "2 nguyen hue",
    },
  });
};
// addEmails();

//3.4 Update the user profile field of the existing subscriber using Mailchimp's RESTful API
const updateMember = async () => {
  const list_id = await getList();
  const response = await mailchimp.lists.updateListMember(
    list_id,
    "Marcel80@gmail.com", //add email or contact_id of that user here
    {
      merge_fields: {
        FNAME: "Marcel80",
        LNAME: "Grady",
        BIRTHDAY: "01/22",
        ADDRESS: {
          addr1: "123 Freddie Ave",
          city: "Atlanta",
          state: "GA",
          zip: "12345",
        },
      },
      status: "subscribed",
    }
  );
  console.log("response", response);
  return response;
};
updateMember();

//3.5 Update one of the email address from subscribed to unsubscribed
const updateMemberEmail = async () => {
  const list_id = await getList();
  const response = await mailchimp.lists.updateListMember(
    list_id,
    "binhhoangngoc12@gmail.com", //email of a subsribed user
    {
      status: "unsubscribed",
    }
  );
  console.log("unsubscribed", response);
};
updateMemberEmail();
