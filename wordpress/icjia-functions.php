<?php


/** **************************************************************************************************************************************
 * ICJIA Custom endpoints and content types
 * 
 * 1) Put this file in /<sitename>/wp-content/themes/<themename>/
 * 
 * 2) Add the following line to the end of functions.php:
 * 
 * require_once( get_template_directory() . '/icjia-functions.php' );
 * 
 */




/**
 * Add 'sitemeta' endpoint
 */


add_action( 'rest_api_init', 'my_register_sitemeta');
function my_register_sitemeta() {
            
        register_rest_route( 'wp/v2', 'sitemeta', array(
                'methods' => 'GET',
                'callback' => 'site_meta',
               
        )
        );
}

function site_meta() {

    $posts_list = get_posts(array('numberposts'=>'-1','post_type'=>'any','sort_order' => 'desc'));
    $post_data = array();
    $site_base = 'http://wpdev.icjia-api.cloud';
    $client_base = "https://cjcc.netlify.com";
    $api_namespace = 'wp/v2';
    $api_base = get_rest_url().$api_namespace.'/';
    $page_array = array();
    
    foreach( $posts_list as $posts) {
        $excerpt = wp_trim_words( $posts->post_content, 35 );
        
        
        $parent = get_post(get_post_ancestors( $posts));
        $author = get_the_author_meta(1);
        $api_link = $api_base.$posts->post_type.'s/'.$posts->ID;
		
		
        $acf = get_fields($posts->ID);
        if ($acf['breadcrumb']) {
            $breadcrumb = $acf['breadcrumb'];
        } else {
            $breadcrumb = false;
        }
        
        
        $myPage = array ();
        $myPage['id'] = $posts->ID;
        $myPage['author'] = $posts->post_author;
        $myPage['date'] = $posts->post_date ; 
        $myPage['title'] = $posts->post_title ;
        $myPage['excerpt'] = html_entity_decode($excerpt);
        $myPage['status'] = $posts->post_status;
        $myPage['slug'] = $posts->post_name;
        $myPage['breadcrumb'] = $breadcrumb;
        $myPage['modified'] = $posts->post_modified;
        $myPage['route'] = substr_replace(str_replace(get_home_url(),'',get_permalink($posts->ID)) ,"",-1);
        $myPage['type'] = $posts->post_type;
        $myPage['tags'] = get_the_tags($posts->ID);
        $myPage['categories'] = get_the_category( $posts->ID );
        $myPage['permalink'] = str_replace(get_home_url(),$client_base,get_permalink($posts->ID));
        $myPage['clientUrl'] = $client_base;
        $myPage['apiBase'] = $api_base;
        $myPage['apiUrlBySlug'] = $api_namespace.'/'.$posts->post_type.'s/?slug='.$posts->post_name;
        $myPage['apiLink'] = $api_link;
        $myPage['apiLinkEmbedded'] = $api_link.'?_embed';
        $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $posts->ID ), 'thumbnail' );
        $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $posts->ID ), 'thumbnail' );
        $thumbnail_url = $thumbnail['0'];
        $myPage['featuredImageThumb'] = $thumbnail_url;
        
        
        
        
        
        array_push($page_array, $myPage);
        
    }
    

    wp_reset_postdata();
    return rest_ensure_response( $page_array);

}


/**
 * Add 'routes' endpoint. Will use this for prerendering, eventually.
 */

add_action( 'rest_api_init', 'my_register_siteroutes');
function my_register_siteroutes() {
            
        register_rest_route( 'wp/v2', 'routes', array(
                'methods' => 'GET',
                'callback' => 'routes', 
        )
        );
}

function routes() {
            
    $posts_list = get_posts(array('numberposts'=>'-1','post_type'=>'any','sort_order' => 'desc'));
    $post_data = array();
    $site_base = 'http://wpdev.icjia.cloud';
    
	 $routes = array();
//     array_push($routes,'/preview');
//     array_push($routes,'/');
    foreach( $posts_list as $posts) {
        // remove api url
        $route = str_replace(get_home_url(),'',get_permalink($posts->ID));
        // remove trailing slash
        array_push($routes, substr_replace($route ,"",-1));
    }

    wp_reset_postdata();
    return rest_ensure_response( $routes );

}

/**
 * Register a custom post type, with REST API support
 *
 * Based on example at: https://codex.wordpress.org/Function_Reference/register_post_type
 */
// add_action( 'init', 'my_article_cpt' );
// function my_article_cpt() {
//     $args = array(
//       'public'       => true,
//       'show_in_rest' => true,
//       'label'        => 'Articles',
//       'rest_base' => 'articles',
//       'rewrite' => array( 'with_front' => false ),
//     );
//     register_post_type( 'article', $args );
// }


add_action( 'rest_api_init', function () {

    register_rest_route( 'wp/v2', 'get-by-tag/(?P<slug>[a-z0-9]+(?:-[a-z0-9]+)*)', array(
          'methods' => 'GET',
          'callback' => 'myscope_get_posts_by_tag',
          'args' => array(
              'slug' => array (
                  'required' => false
              ),
              
          )
      ) );

  } );


//     // Add Featured Image
    register_rest_field( 'post',
        'featured_image_src',
        array(
            'get_callback'      => 'my_get_image_src',
            'update_callback'   => null,
            'schema'            => null
        )
   );

function my_get_image_src( $object, $field_name, $request ) {
   if($object[ 'featured_media' ] == 0) {
       return $object[ 'featured_media' ];
   }
    
    $featured_media = array (
        'thumb'=> wp_get_attachment_image_src( $object[ 'featured_media' ], 'thumbnail', true ),
        'small'=> wp_get_attachment_image_src( $object[ 'featured_media' ], 'thumbnail', true ),
        'medium' => wp_get_attachment_image_src( $object[ 'featured_media' ], 'medium', true ),
        'large' => wp_get_attachment_image_src( $object[ 'featured_media' ], 'large', true ),
        'full' => wp_get_attachment_image_src( $object[ 'featured_media' ], 'full', true ),
    );
    
    
   return $featured_media;
}


// Add Published Date
    register_rest_field( 'post',
       'published_date',
       array(
           'get_callback'      => 'my_published_date',
           'update_callback'   => null,
           'schema'            => null
       )
    );

function my_published_date( $object, $field_name, $request ) {
    return get_the_time('F j, Y');
}


    register_rest_field( 'post',
       'category_names',
       array(
           'get_callback'      => 'my_category_names',
           'update_callback'   => null,
           'schema'            => null
       )
    );

function my_category_names( $object, $field_name, $request ) {
    

    $categories = get_the_category( $object['id'] );
    

    return $categories;
}


    register_rest_field( 'post',
       'tag_names',
       array(
           'get_callback'      => 'my_tag_names',
           'update_callback'   => null,
           'schema'            => null
       )
    );

function my_tag_names( $object, $field_name, $request ) {
    
    $tags = get_the_tags( $object['id'] );
    
    return $tags;
}

add_filter( 'preview_post_link', 'the_preview_fix' );

function the_preview_fix() {
    $post = get_post();
    $permalink = get_the_permalink($post->ID);
    $preview_url = "https://cjcc.netlify.com/preview?url=wp/v2/".$post->post_type."s/".$post->ID;

    return $preview_url;
}


?>

