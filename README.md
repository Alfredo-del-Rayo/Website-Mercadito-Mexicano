# Website-Mercadito-Mexicano
This personal project, developed by Alfredo Alexei del Rayo, represents Mercadito's Mexicano official shopping website. It is powered by an Express framework, enhanced by EJS templates and a MySQL database as its foundation

![image](README%20Images/main_page.png)

## Key Features:

Layout Perfection: Captivating header and footer that grace every page, except the payments route. The header boasts a logo anchored to the main page, an elegant dropdown menu, and quick-access buttons for search, account, and shopping. Usernames personalize the experience, and the shopping bag flaunts the cart's item count. The footer holds insights, social links, and a subscription mechanism, empowering connections.

![image](README%20Images/footer.png)

Dynamic Main Page: An enchanting slideshow welcomes you, offering a visual narrative. The 'Best Sellers' section showcases 10 random products, inviting exploration. The 'Featured Collection' beckons with six captivating assortments, each a portal to a world of unique products. Parallax-effect imagery enriches the experience, leaving you inspired.

![image](README%20Images/best_sellers.png)


Curated Collection Exploration: Immerse in meticulously curated assortments mirroring individual preferences. Eleven distinct assortments stand prepared for exploration, facilitating keyword-based search. 

![image](README%20Images/featured_collections.png)

**Dynamic Product Display Pages:** The product's show page is a visual delight. Variant images elegantly glide into focus, reflecting selections. Sold-out alerts, cart management, and error guidance guarantee satisfaction. The product show page displays the image of the selected variant on the left which can be changed using the JavaScript animated buttons or the horizontal scroll panel that includes all images of the product. When an image is selected a black outline appears and it is displayed as the main image. When selecting a variant from the variant selector, the image of the variant becomes the main image and the panel scrolls to make the variant image visible on the scroll panel. If the quantity of the product is 0 it appears as sold out. A fixed message on the top appears if the cart is full, the product has already been added, the user has not logged in, or a new item is added to the shopping cart. Finally, there is a button to go back that displays as back to home, cart or the selected collection.   

![image](README%20Images/product_show.png)

![image](README%20Images/product_message.png)



**Empowering Account Route:** Seamless creation of accounts with a real-time availability tracker. Secure registration with robust character restrictions, error highlighting, and encrypted password handling. Login journeys culminate in encrypted JWT tokens, reinforcing security. Logout invalidates cookies, offering peace of mind.

![image](README%20Images/login.png)


**Intelligent Product Search:** The search bar is the user's gateway to discovery. Entering a query will display all products whose titles match the substring. 

![image](README%20Images/search.png)


**Effortless Checkout & Payment:** Seamless checkout, integrated with Square's API, transforms purchases into a breeze. Confirmation numbers and order details mark successful transactions. Cart management ensures real-time updates.

![image](README%20Images/checkout.png)


**Engagement via Contact Form:** Effortless connection through user-friendly contact form. An email notification gracefully finds its way to us.

![image](README%20Images/contact.png)
