import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'vi';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.categories': 'Categories',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.account': 'My Account',
    'nav.logout': 'Log out',
    'nav.profile': 'Profile',
    // Product related
    'product.addToCart': 'Add to Cart',
    'product.price': 'Price',
    'product.category': 'Category',
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue Shopping',
    'cart.product': 'Product',
    'cart.quantity': 'Quantity',
    'cart.total': 'Total',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.tax': 'Tax (7%)',
    'cart.grandTotal': 'Total',
    'cart.promoCode': 'Promo Code',
    'cart.enterCode': 'Enter code',
    'cart.apply': 'Apply',
    'cart.checkout': 'Proceed to Checkout',
    'cart.processing': 'Processing...',
    'cart.paymentMethods': 'We accept:',
    'cart.emptyCartMessage': 'Looks like you haven\'t added anything to your cart yet. Browse our products and find something you\'ll love!',
    'cart.orderSummary': 'Order Summary',
    'cart.removeItem': 'Remove item',
    'cart.increaseQuantity': 'Increase quantity',
    'cart.decreaseQuantity': 'Decrease quantity',
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.emailError': 'Please enter a valid email address',
    'auth.passwordError': 'Password must be at least 6 characters',
    'auth.emailPlaceholder': 'Enter your email',
    'auth.passwordPlaceholder': 'Enter your password',
    'auth.namePlaceholder': 'Enter your name',
    'auth.loggingIn': 'Logging in...',
    'auth.loginSuccess': 'Login successful!',
    'auth.loginError': 'Please check your login information',
    'auth.noAccount': "Don't have an account? Sign up",
    'auth.orContinueWith': 'Or continue with',
    'auth.registerSuccess': 'Registration successful',
    'auth.accountCreated': 'Your account has been created',
    'auth.registerFailed': 'Registration failed',
    'auth.tryAgain': 'Please try again with different information',
    'auth.creatingAccount': 'Creating account...',
    'auth.createAccount': 'Create account',
    'auth.haveAccount': 'Already have an account? Sign in',
    // Shop
    'shop.title': 'Shop',
    'shop.search': 'Search products...',
    'shop.filters': 'Filters',
    'shop.sortBy': 'Sort by',
    'shop.allCategories': 'All Categories',
    'shop.priceRange': 'Price Range',
    'shop.to': 'to',
    'shop.reset': 'Reset',
    'shop.category': 'Category',
    'shop.noProducts': 'No products found',
    'shop.adjustSearch': 'Try adjusting your search or filter criteria',
    'shop.resetFilters': 'Reset All Filters',
    'shop.applyFilters': 'Apply Filters',
    'shop.workingHours': 'Working Hours',

    // Footer
    'footer.subscribe': 'Subscribe to our newsletter',
    'footer.subscribeDesc': 'Subscribe to our newsletter for the latest updates and offers.',
    'footer.enterEmail': 'Enter your email',
    'footer.newArrivals': 'New Arrivals',
    'footer.bestSellers': 'Best Sellers',
    'footer.trending': 'Trending',
    'footer.specialOffers': 'Sale & Special Offers',
    'footer.allCollections': 'All Collections',
    'footer.myAccount': 'My Account',
    'footer.orderHistory': 'Order History',
    'footer.wishList': 'Wish List',
    'footer.returns': 'Returns',
    'footer.support': 'Help & Support',
    'footer.contact': 'Contact',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.address': 'Address',
    'footer.workingHours': 'Working Hours',
    'footer.rights': 'All rights reserved.',

    // Home
    'home.hero.title': 'Elevate Your Style with Our Collections',
    'home.hero.description': 'Discover premium quality items designed for the modern lifestyle. From timeless classics to the latest trends, we have something for everyone.',
    'home.hero.shopNow': 'Shop Now',
    'home.products.title': 'Our Products',
    'home.products.subtitle': 'Explore Our Products',
    'home.products.description': 'Discover our handpicked selection of premium products designed for style and comfort.',
    'home.products.allProducts': 'All Products',
    'home.products.electronics': 'Electronics',
    'home.products.jewelry': 'Jewelry',
    'home.products.menClothing': 'Men\'s Clothing',
    'home.products.womenClothing': 'Women\'s Clothing',
    'home.products.viewAll': 'View All Products',
    'home.categories.title': 'Categories',
    'home.categories.subtitle': 'Browse By Category',
    'home.categories.description': 'Find exactly what you\'re looking for by shopping our curated collections.',
    'home.newsletter.title': 'Subscribe to Our Newsletter',
    'home.newsletter.description': 'Stay updated with our latest collections, exclusive offers, and fashion inspiration delivered directly to your inbox.',
    'home.newsletter.subscribe': 'Subscribe',
    'home.newsletter.placeholder': 'Enter your email address',
    'home.newsletter.agreement': 'By subscribing, you agree to our Privacy Policy and consent to receive updates.',

    // About
    'about.title': 'Our Story',
    'about.subtitle': 'Exclusive is a premier destination for curated fashion, tech, and home goods, offering a seamless shopping experience since 2023.',
    'about.story.title': 'We\'re Passionate About Quality Products',
    'about.story.description1': 'Founded in 2023, Exclusive began with a simple vision: to create a marketplace where quality, design, and customer experience come first. What started as a small online store has grown into a comprehensive shopping destination loved by customers worldwide.',
    'about.story.description2': 'We partner with the best brands and artisans to bring you carefully selected products that combine style, functionality, and sustainability. Our team works tirelessly to ensure every interaction with Exclusive exceeds your expectations.',
    'about.story.learnMore': 'Learn More',
    'about.stats.customers': 'Satisfied Customers',
    'about.stats.products': 'Products Available',
    'about.stats.brands': 'Global Brands',
    'about.stats.satisfaction': 'Customer Satisfaction',
    'about.team.title': 'Meet Our Expert Team',
    'about.team.subtitle': 'The talented people behind the scenes of our organization',
    'about.cta.title': 'Ready to Start Shopping?',
    'about.cta.description': 'Join thousands of satisfied customers who love our products and exceptional service.',
    'about.cta.button': 'Shop Now',
    'about.contact.location': 'Our Location',
    'about.contact.phone': 'Phone',
    'about.contact.email': 'Email',
    'about.contact.hours': 'Working Hours',

    // Contact
    'contact.title': 'Contact Us',
    'contact.home': 'Home',
    'contact.contact' : 'Contact',
    'contact.subtitle': 'Any question or remarks? Just write us a message!',
    'contact.info.title': 'Contact Information',
    'contact.info.description': 'Fill up the form and our team will get back to you within 24 hours.',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.phone': 'Phone Number',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.namePlaceholder': 'John Doe',
    'contact.form.emailPlaceholder': 'example@email.com',
    'contact.form.phonePlaceholder': '+1 (234) 567-8900',
    'contact.form.subjectPlaceholder': 'How can we help you?',
    'contact.form.messagePlaceholder': 'Write your message here...',
    'contact.form.submit' : 'Submit',
    // Account
    'account.title': 'My Account',
    'account.profile': 'Profile',
    'account.profileDesc': 'Manage your account information',
    'account.email': 'Email',
    'account.name': 'Name',
    'account.signInMethod': 'Sign-in method',
    'account.signOut': 'Sign Out',
    'account.orders': 'Orders',
    'account.ordersDesc': 'View your order history',
    'account.noOrders': 'You haven\'t placed any orders yet.',
    'account.startShopping': 'Start Shopping',
    'account.wishlist': 'Wishlist',
    'account.wishlistDesc': 'Products you\'ve saved for later',
    'account.emptyWishlist': 'Your wishlist is empty.',
    'account.exploreProducts': 'Explore Products',
    'account.signInRequired': 'Sign in to your account',
    'account.signInMessage': 'Please sign in to view your account details, orders, and more.',
    'account.returnHome': 'Return to Home',
  },
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.shop': 'Cửa hàng',
    'nav.categories': 'Danh mục',
    'nav.about': 'Về chúng tôi',
    'nav.contact': 'Liên hệ',
    'nav.account': 'Tài khoản',
    'nav.logout': 'Đăng xuất',
    'nav.profile': 'Hồ sơ',
    // Product related
    'product.addToCart': 'Thêm vào giỏ',
    'product.price': 'Giá',
    'product.category': 'Danh mục',
    // Cart
    'cart.title': 'Giỏ hàng',
    'cart.empty': 'Giỏ hàng trống',
    'cart.continueShopping': 'Tiếp tục mua sắm',
    'cart.product': 'Sản phẩm',
    'cart.quantity': 'Số lượng',
    'cart.total': 'Tổng cộng',
    'cart.subtotal': 'Tạm tính',
    'cart.shipping': 'Phí vận chuyển',
    'cart.tax': 'Thuế (7%)',
    'cart.grandTotal': 'Tổng tiền',
    'cart.promoCode': 'Mã giảm giá',
    'cart.enterCode': 'Nhập mã',
    'cart.apply': 'Áp dụng',
    'cart.checkout': 'Tiến hành thanh toán',
    'cart.processing': 'Đang xử lý...',
    'cart.paymentMethods': 'Chúng tôi chấp nhận:',
    'cart.emptyCartMessage': 'Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy xem qua các sản phẩm của chúng tôi và tìm thứ gì đó bạn yêu thích!',
    'cart.orderSummary': 'Tóm tắt đơn hàng',
    'cart.removeItem': 'Xóa sản phẩm',
    'cart.increaseQuantity': 'Tăng số lượng',
    'cart.decreaseQuantity': 'Giảm số lượng',
    // Auth
    'auth.login': 'Đăng nhập',
    'auth.register': 'Đăng ký',
    'auth.email': 'Email',
    'auth.password': 'Mật khẩu',
    'auth.name': 'Họ tên',
    'auth.emailError': 'Vui lòng nhập đúng địa chỉ email',
    'auth.passwordError': 'Mật khẩu tối thiểu 6 ký tự',
    'auth.emailPlaceholder': 'Nhập email',
    'auth.passwordPlaceholder': 'Nhập mật khẩu',
    'auth.namePlaceholder': 'Nhập họ tên',
    'auth.loggingIn': 'Đang đăng nhập...',
    'auth.loginSuccess': 'Đăng nhập thành công!',
    'auth.loginError': 'Vui lòng kiểm tra thông tin đăng nhập',
    'auth.noAccount': 'Chưa có tài khoản? Đăng ký',
    'auth.orContinueWith': 'Hoặc tiếp tục với',
    'auth.registerSuccess': 'Đăng ký thành công',
    'auth.accountCreated': 'Tài khoản của bạn đã được tạo',
    'auth.registerFailed': 'Đăng ký thất bại',
    'auth.tryAgain': 'Vui lòng thử lại với thông tin khác',
    'auth.creatingAccount': 'Đang tạo tài khoản...',
    'auth.createAccount': 'Tạo tài khoản',
    'auth.haveAccount': 'Đã có tài khoản? Đăng nhập',
    // Shop
    'shop.title': 'Cửa hàng',
    'shop.search': 'Tìm kiếm sản phẩm...',
    'shop.filters': 'Bộ lọc',
    'shop.sortBy': 'Sắp xếp theo',
    'shop.allCategories': 'Tất cả danh mục',
    'shop.priceRange': 'Khoảng giá',
    'shop.to': 'đến',
    'shop.reset': 'Đặt lại',
    'shop.category': 'Danh mục',
    'shop.noProducts': 'Không tìm thấy sản phẩm',
    'shop.adjustSearch': 'Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc của bạn',
    'shop.resetFilters': 'Đặt lại tất cả bộ lọc',
    'shop.applyFilters': 'Áp dụng bộ lọc',
    'shop.workingHours': 'Giờ làm việc',

    // Footer
    'footer.subscribe': 'Đăng ký nhận bản tin',
    'footer.subscribeDesc': 'Đăng ký nhận bản tin để cập nhật thông tin và ưu đãi mới nhất.',
    'footer.enterEmail': 'Nhập email của bạn',
    'footer.newArrivals': 'Hàng Mới Về',
    'footer.bestSellers': 'Bán Chạy Nhất',
    'footer.trending': 'Xu Hướng',
    'footer.specialOffers': 'Khuyến Mãi & Ưu Đãi Đặc Biệt',
    'footer.allCollections': 'Tất Cả Bộ Sưu Tập',
    'footer.myAccount': 'Tài Khoản',
    'footer.orderHistory': 'Lịch Sử Đơn Hàng',
    'footer.wishList': 'Danh Sách Yêu Thích',
    'footer.returns': 'Đổi Trả',
    'footer.support': 'Hỗ Trợ & Giúp Đỡ',
    'footer.contact': 'Liên Hệ',
    'footer.phone': 'Điện thoại',
    'footer.email': 'Email',
    'footer.address': 'Địa chỉ',
    'footer.workingHours': 'Giờ làm việc',
    'footer.rights': 'Đã đăng ký bản quyền.',

    // Home
    'home.hero.title': 'Nâng Tầm Phong Cách Của Bạn Với Bộ Sưu Tập Của Chúng Tôi',
    'home.hero.description': 'Khám phá các sản phẩm chất lượng cao được thiết kế cho lối sống hiện đại. Từ những món đồ cổ điển đến xu hướng mới nhất, chúng tôi có mọi thứ cho mọi người.',
    'home.hero.shopNow': 'Mua Ngay',
    'home.products.title': 'Sản Phẩm Của Chúng Tôi',
    'home.products.subtitle': 'Khám Phá Sản Phẩm',
    'home.products.description': 'Khám phá bộ sưu tập sản phẩm cao cấp được chọn lọc của chúng tôi, được thiết kế để mang lại phong cách và sự thoải mái.',
    'home.products.allProducts': 'Tất Cả Sản Phẩm',
    'home.products.electronics': 'Điện Tử',
    'home.products.jewelry': 'Trang Sức',
    'home.products.menClothing': 'Thời Trang Nam',
    'home.products.womenClothing': 'Thời Trang Nữ',
    'home.products.viewAll': 'Xem Tất Cả Sản Phẩm',
    'home.categories.title': 'Danh Mục',
    'home.categories.subtitle': 'Duyệt Theo Danh Mục',
    'home.categories.description': 'Tìm chính xác những gì bạn đang tìm kiếm bằng cách mua sắm trong bộ sưu tập được tuyển chọn của chúng tôi.',
    'home.newsletter.title': 'Đăng Ký Nhận Bản Tin',
    'home.newsletter.description': 'Cập nhật các bộ sưu tập mới nhất, ưu đãi độc quyền và cảm hứng thời trang được gửi trực tiếp đến hộp thư của bạn.',
    'home.newsletter.subscribe': 'Đăng Ký',
    'home.newsletter.placeholder': 'Nhập địa chỉ email của bạn',
    'home.newsletter.agreement': 'Bằng cách đăng ký, bạn đồng ý với Chính sách quyền riêng tư và đồng ý nhận các cập nhật.',

    // About
    'about.title': 'Câu Chuyện Của Chúng Tôi',
    'about.subtitle': 'Exclusive là điểm đến hàng đầu cho thời trang, công nghệ và đồ gia dụng được tuyển chọn, mang đến trải nghiệm mua sắm liền mạch từ năm 2023.',
    'about.story.title': 'Chúng Tôi Đam Mê Về Sản Phẩm Chất Lượng',
    'about.story.description1': 'Được thành lập vào năm 2023, Exclusive bắt đầu với một tầm nhìn đơn giản: tạo ra một thị trường nơi chất lượng, thiết kế và trải nghiệm khách hàng là ưu tiên hàng đầu. Từ một cửa hàng trực tuyến nhỏ đã phát triển thành điểm đến mua sắm toàn diện được khách hàng trên toàn thế giới yêu thích.',
    'about.story.description2': 'Chúng tôi hợp tác với các thương hiệu và nghệ nhân tốt nhất để mang đến cho bạn những sản phẩm được chọn lọc kỹ lưỡng kết hợp giữa phong cách, chức năng và tính bền vững. Đội ngũ của chúng tôi làm việc không mệt mỏi để đảm bảo mọi tương tác với Exclusive vượt quá mong đợi của bạn.',
    'about.story.learnMore': 'Tìm Hiểu Thêm',
    'about.stats.customers': 'Khách Hàng Hài Lòng',
    'about.stats.products': 'Sản Phẩm Có Sẵn',
    'about.stats.brands': 'Thương Hiệu Toàn Cầu',
    'about.stats.satisfaction': 'Sự Hài Lòng Của Khách Hàng',
    'about.team.title': 'Gặp Gỡ Đội Ngũ Chuyên Gia',
    'about.team.subtitle': 'Những người tài năng đứng sau thành công của tổ chức chúng tôi',
    'about.cta.title': 'Sẵn Sàng Bắt Đầu Mua Sắm?',
    'about.cta.description': 'Tham gia cùng hàng nghìn khách hàng hài lòng yêu thích sản phẩm và dịch vụ xuất sắc của chúng tôi.',
    'about.cta.button': 'Mua Sắm Ngay',
    'about.contact.location': 'Địa Điểm',
    'about.contact.phone': 'Điện Thoại',
    'about.contact.email': 'Email',
    'about.contact.hours': 'Giờ Làm Việc',

    // Contact
    'contact.title': 'Liên Hệ Với Chúng Tôi',
    'contact.home': 'Trang chủ',
    'contact.contact' : 'Liên hệ',
    'contact.subtitle': 'Bạn có câu hỏi hoặc góp ý? Hãy gửi tin nhắn cho chúng tôi!',
    'contact.info.title': 'Thông Tin Liên Hệ',
    'contact.info.description': 'Điền vào biểu mẫu và đội ngũ của chúng tôi sẽ phản hồi trong vòng 24 giờ.',
    'contact.form.name': 'Họ Tên',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Số Điện Thoại',
    'contact.form.subject': 'Tiêu Đề',
    'contact.form.message': 'Tin Nhắn',
    'contact.form.send': 'Gửi Tin Nhắn',
    'contact.form.namePlaceholder': 'Nguyễn Văn A',
    'contact.form.emailPlaceholder': 'example@email.com',
    'contact.form.phonePlaceholder': '+84 123 456 789',
    'contact.form.subjectPlaceholder': 'Chúng tôi có thể giúp gì cho bạn?',
    'contact.form.messagePlaceholder': 'Viết tin nhắn của bạn tại đây...',
    'contact.form.submit' : 'Gửi',
    // Account
    'account.title': 'Tài Khoản Của Tôi',
    'account.profile': 'Hồ Sơ',
    'account.profileDesc': 'Quản lý thông tin tài khoản của bạn',
    'account.email': 'Email',
    'account.name': 'Họ tên',
    'account.signInMethod': 'Phương thức đăng nhập',
    'account.signOut': 'Đăng xuất',
    'account.orders': 'Đơn hàng',
    'account.ordersDesc': 'Xem lịch sử đơn hàng',
    'account.noOrders': 'Bạn chưa có đơn hàng nào.',
    'account.startShopping': 'Bắt đầu mua sắm',
    'account.wishlist': 'Danh sách yêu thích',
    'account.wishlistDesc': 'Sản phẩm bạn đã lưu để xem sau',
    'account.emptyWishlist': 'Danh sách yêu thích của bạn đang trống.',
    'account.exploreProducts': 'Khám phá sản phẩm',
    'account.signInRequired': 'Đăng nhập vào tài khoản',
    'account.signInMessage': 'Vui lòng đăng nhập để xem chi tiết tài khoản, đơn hàng và hơn thế nữa.',
    'account.returnHome': 'Quay về trang chủ',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
