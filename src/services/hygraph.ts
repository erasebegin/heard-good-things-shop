export async function fetchShopItems() {
  const res = await fetch(
    "https://api-eu-west-2.hygraph.com/v2/clsg01w6q1tke01upglyat99n/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
       {
        general(where: {id: "clsg0czucz25f0amomkf90laq"}) {
            footerText
          }
          shopItems(first: 20) {
            price
            title
            color
            slug
            images(first: 10) {
              url
              id
            }
            id
            description {
              html
            }
          }
      }
                        `,
      }),
    }
  );

  return res.json();
}

export async function fetchShopItem(slug: string) {
  const res = await fetch(
    "https://api-eu-west-2.hygraph.com/v2/clsg01w6q1tke01upglyat99n/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
       {
        shopItem(where: {slug: "${slug}"}) {
            price
            images(first: 10) {
              url
            }
            title
            color
            slug
            description {
              html
              text
            }
          }
      }
                        `,
      }),
    }
  );

  return res.json();
}

export async function fetchGeneralContent() {
  const res = await fetch(
    "https://api-eu-west-2.hygraph.com/v2/clsg01w6q1tke01upglyat99n/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
       {
        general(where: {id: "clsg0czucz25f0amomkf90laq"}) {
            footerText
        }
      }
                        `,
      }),
    }
  );

  return res.json();
}
