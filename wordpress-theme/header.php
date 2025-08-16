<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <header class="site-header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <?php if (has_custom_logo()) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/logo.svg" alt="<?php bloginfo('name'); ?>">
                    <?php endif; ?>
                    <div class="logo-text">
                        <h1><?php bloginfo('name'); ?></h1>
                        <p><?php bloginfo('description'); ?></p>
                    </div>
                </div>
                
                <nav class="main-nav">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_class' => 'main-menu',
                        'container' => false,
                        'fallback_cb' => 'default_menu'
                    ));
                    ?>
                </nav>
                
                <div class="header-actions">
                    <a href="#contact" class="btn btn-primary">احصل على تسعيرة</a>
                </div>
            </div>
        </div>
    </header>

<?php
// القائمة الافتراضية إذا لم يتم إنشاء قائمة
function default_menu() {
    echo '<ul class="main-menu">';
    echo '<li><a href="#home" class="active">الرئيسية</a></li>';
    echo '<li><a href="#about">حول الشركة</a></li>';
    echo '<li><a href="#services">خدماتنا</a></li>';
    echo '<li><a href="#projects">مشاريعنا</a></li>';
    echo '<li><a href="#contact">اتصل بنا</a></li>';
    echo '</ul>';
}
?>