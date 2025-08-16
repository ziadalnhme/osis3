<?php
/**
 * قالب أسس الأعمار للاستشارات الهندسية
 * ملف الوظائف الرئيسية
 */

// منع الوصول المباشر
if (!defined('ABSPATH')) {
    exit;
}

// إعداد القالب
function osos_imar_setup() {
    // دعم العنوان التلقائي
    add_theme_support('title-tag');
    
    // دعم الصور المميزة
    add_theme_support('post-thumbnails');
    
    // دعم الشعار المخصص
    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 60,
        'flex-width'  => true,
        'flex-height' => true,
    ));
    
    // دعم HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // تسجيل القوائم
    register_nav_menus(array(
        'primary' => 'القائمة الرئيسية',
        'footer'  => 'قائمة الفوتر',
    ));
}
add_action('after_setup_theme', 'osos_imar_setup');

// تحميل الأنماط والسكريبتات
function osos_imar_scripts() {
    // تحميل ملف الأنماط الرئيسي
    wp_enqueue_style('osos-imar-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // تحميل الخطوط
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=GE+Dinkum:wght@200;300;400;500;600;700;800&display=swap', array(), null);
    
    // تحميل jQuery
    wp_enqueue_script('jquery');
    
    // سكريبت مخصص للتأثيرات
    wp_enqueue_script('osos-imar-script', get_template_directory_uri() . '/assets/script.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'osos_imar_scripts');

// تسجيل مناطق الودجت
function osos_imar_widgets_init() {
    register_sidebar(array(
        'name'          => 'الشريط الجانبي',
        'id'            => 'sidebar-1',
        'description'   => 'الشريط الجانبي الرئيسي',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => 'فوتر 1',
        'id'            => 'footer-1',
        'description'   => 'منطقة الفوتر الأولى',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
    
    register_sidebar(array(
        'name'          => 'فوتر 2',
        'id'            => 'footer-2',
        'description'   => 'منطقة الفوتر الثانية',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
    
    register_sidebar(array(
        'name'          => 'فوتر 3',
        'id'            => 'footer-3',
        'description'   => 'منطقة الفوتر الثالثة',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'osos_imar_widgets_init');

// إضافة دعم للغة العربية
function osos_imar_language_setup() {
    load_theme_textdomain('osos-imar', get_template_directory() . '/languages');
}
add_action('after_setup_theme', 'osos_imar_language_setup');

// تخصيص طول المقتطف
function osos_imar_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'osos_imar_excerpt_length');

// تخصيص نهاية المقتطف
function osos_imar_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'osos_imar_excerpt_more');

// إضافة أنماط مخصصة لمحرر جوتنبرغ
function osos_imar_editor_styles() {
    add_theme_support('editor-styles');
    add_editor_style('editor-style.css');
}
add_action('after_setup_theme', 'osos_imar_editor_styles');

// إضافة ألوان مخصصة للقالب
function osos_imar_custom_colors() {
    add_theme_support('editor-color-palette', array(
        array(
            'name'  => 'الأزرق الرئيسي',
            'slug'  => 'primary-blue',
            'color' => '#1e40af',
        ),
        array(
            'name'  => 'الأصفر المميز',
            'slug'  => 'accent-yellow',
            'color' => '#fbbf24',
        ),
        array(
            'name'  => 'الرمادي الفاتح',
            'slug'  => 'light-gray',
            'color' => '#f9fafb',
        ),
        array(
            'name'  => 'الرمادي الداكن',
            'slug'  => 'dark-gray',
            'color' => '#1f2937',
        ),
    ));
}
add_action('after_setup_theme', 'osos_imar_custom_colors');

// إضافة أحجام صور مخصصة
function osos_imar_image_sizes() {
    add_image_size('project-thumbnail', 400, 300, true);
    add_image_size('service-icon', 80, 80, true);
    add_image_size('team-member', 300, 300, true);
}
add_action('after_setup_theme', 'osos_imar_image_sizes');

// إضافة دعم للقوائم المخصصة
function osos_imar_custom_post_types() {
    // نوع مخصص للمشاريع
    register_post_type('projects', array(
        'labels' => array(
            'name' => 'المشاريع',
            'singular_name' => 'مشروع',
            'add_new' => 'إضافة مشروع جديد',
            'add_new_item' => 'إضافة مشروع جديد',
            'edit_item' => 'تحرير المشروع',
            'new_item' => 'مشروع جديد',
            'view_item' => 'عرض المشروع',
            'search_items' => 'البحث في المشاريع',
            'not_found' => 'لم يتم العثور على مشاريع',
            'not_found_in_trash' => 'لم يتم العثور على مشاريع في المهملات'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-building',
        'rewrite' => array('slug' => 'projects'),
    ));
    
    // نوع مخصص للخدمات
    register_post_type('services', array(
        'labels' => array(
            'name' => 'الخدمات',
            'singular_name' => 'خدمة',
            'add_new' => 'إضافة خدمة جديدة',
            'add_new_item' => 'إضافة خدمة جديدة',
            'edit_item' => 'تحرير الخدمة',
            'new_item' => 'خدمة جديدة',
            'view_item' => 'عرض الخدمة',
            'search_items' => 'البحث في الخدمات',
            'not_found' => 'لم يتم العثور على خدمات',
            'not_found_in_trash' => 'لم يتم العثور على خدمات في المهملات'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-admin-tools',
        'rewrite' => array('slug' => 'services'),
    ));
    
    // نوع مخصص لفريق العمل
    register_post_type('team', array(
        'labels' => array(
            'name' => 'فريق العمل',
            'singular_name' => 'عضو فريق',
            'add_new' => 'إضافة عضو جديد',
            'add_new_item' => 'إضافة عضو جديد',
            'edit_item' => 'تحرير العضو',
            'new_item' => 'عضو جديد',
            'view_item' => 'عرض العضو',
            'search_items' => 'البحث في الفريق',
            'not_found' => 'لم يتم العثور على أعضاء',
            'not_found_in_trash' => 'لم يتم العثور على أعضاء في المهملات'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-groups',
        'rewrite' => array('slug' => 'team'),
    ));
}
add_action('init', 'osos_imar_custom_post_types');

// إضافة حقول مخصصة للمشاريع
function osos_imar_project_meta_boxes() {
    add_meta_box(
        'project_details',
        'تفاصيل المشروع',
        'osos_imar_project_details_callback',
        'projects',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'osos_imar_project_meta_boxes');

function osos_imar_project_details_callback($post) {
    wp_nonce_field('osos_imar_project_details', 'osos_imar_project_details_nonce');
    
    $location = get_post_meta($post->ID, '_project_location', true);
    $area = get_post_meta($post->ID, '_project_area', true);
    $year = get_post_meta($post->ID, '_project_year', true);
    $client = get_post_meta($post->ID, '_project_client', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="project_location">موقع المشروع</label></th>';
    echo '<td><input type="text" id="project_location" name="project_location" value="' . esc_attr($location) . '" /></td></tr>';
    echo '<tr><th><label for="project_area">مساحة المشروع</label></th>';
    echo '<td><input type="text" id="project_area" name="project_area" value="' . esc_attr($area) . '" /></td></tr>';
    echo '<tr><th><label for="project_year">سنة التنفيذ</label></th>';
    echo '<td><input type="text" id="project_year" name="project_year" value="' . esc_attr($year) . '" /></td></tr>';
    echo '<tr><th><label for="project_client">العميل</label></th>';
    echo '<td><input type="text" id="project_client" name="project_client" value="' . esc_attr($client) . '" /></td></tr>';
    echo '</table>';
}

// حفظ البيانات المخصصة للمشاريع
function osos_imar_save_project_details($post_id) {
    if (!isset($_POST['osos_imar_project_details_nonce']) || 
        !wp_verify_nonce($_POST['osos_imar_project_details_nonce'], 'osos_imar_project_details')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    if (isset($_POST['project_location'])) {
        update_post_meta($post_id, '_project_location', sanitize_text_field($_POST['project_location']));
    }
    
    if (isset($_POST['project_area'])) {
        update_post_meta($post_id, '_project_area', sanitize_text_field($_POST['project_area']));
    }
    
    if (isset($_POST['project_year'])) {
        update_post_meta($post_id, '_project_year', sanitize_text_field($_POST['project_year']));
    }
    
    if (isset($_POST['project_client'])) {
        update_post_meta($post_id, '_project_client', sanitize_text_field($_POST['project_client']));
    }
}
add_action('save_post', 'osos_imar_save_project_details');

// إضافة دعم Contact Form 7
function osos_imar_contact_form_support() {
    if (function_exists('wpcf7_add_form_tag')) {
        // دعم إضافي لـ Contact Form 7
        add_filter('wpcf7_autop_or_not', '__return_false');
    }
}
add_action('init', 'osos_imar_contact_form_support');

// تخصيص لوحة التحكم
function osos_imar_admin_customization() {
    // إضافة أنماط مخصصة للوحة التحكم
    echo '<style>
        .toplevel_page_osos-imar-settings .wp-menu-image:before {
            content: "\f318";
        }
    </style>';
}
add_action('admin_head', 'osos_imar_admin_customization');

// إضافة صفحة إعدادات القالب
function osos_imar_admin_menu() {
    add_theme_page(
        'إعدادات قالب أسس الأعمار',
        'إعدادات القالب',
        'manage_options',
        'osos-imar-settings',
        'osos_imar_settings_page'
    );
}
add_action('admin_menu', 'osos_imar_admin_menu');

function osos_imar_settings_page() {
    ?>
    <div class="wrap">
        <h1>إعدادات قالب أسس الأعمار</h1>
        <p>مرحباً بك في قالب شركة أسس الأعمار للاستشارات الهندسية</p>
        
        <h2>معلومات القالب</h2>
        <table class="form-table">
            <tr>
                <th>اسم القالب</th>
                <td>قالب أسس الأعمار للاستشارات الهندسية</td>
            </tr>
            <tr>
                <th>الإصدار</th>
                <td>1.0</td>
            </tr>
            <tr>
                <th>المطور</th>
                <td>م/ زياد فؤاد</td>
            </tr>
            <tr>
                <th>الدعم</th>
                <td>+966 54 746 5459 | <a href="https://wa.me/966547465459">واتساب</a></td>
            </tr>
        </table>
        
        <h2>الإضافات الموصى بها</h2>
        <ul>
            <li><strong>Contact Form 7</strong> - لنماذج الاتصال</li>
            <li><strong>Yoast SEO</strong> - لتحسين محركات البحث</li>
            <li><strong>WP Rocket</strong> - لتسريع الموقع</li>
            <li><strong>Elementor</strong> - لتحرير الصفحات (اختياري)</li>
        </ul>
    </div>
    <?php
}
?>