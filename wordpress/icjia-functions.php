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
    $posts_list = get_posts(array('numberposts'=>'-1','post_type'=> array('post', 'page','council','blob'),'sort_order' => 'desc'));
    $post_data = array();
    $site_base = 'http://cjcc.icjia-api.cloud';
    $client_base = "https://cjcc.icjia.cloud";
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
			$myPage['apiFullUrl'] = $api_base.$posts->post_type.'s/?slug='.$posts->post_name.'&_embed';
        	$myPage['apiLink'] = $api_link;
        	$myPage['apiLinkEmbedded'] = $api_link.'?_embed';
        	$thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $posts->ID ), 'thumbnail' );
        	$full = wp_get_attachment_image_src( get_post_thumbnail_id( $posts->ID ), 'full' );
			$large = wp_get_attachment_image_src( get_post_thumbnail_id( $posts->ID ), 'large' );
        	$myPage['featuredImageThumb'] = $thumbnail['0'];
			$myPage['featuredImageFull'] = $full['0'];
			$myPage['featuredImageLarge'] = $large['0'];
			$myPage['featuredImageCaption'] = wp_get_attachment_caption(get_post_thumbnail_id($posts->ID));
			$alt = get_post_meta(get_post_thumbnail_id($posts->ID), '_wp_attachment_image_alt', true);
			$myPage['featuredImageAlt'] = $alt;
			$myPage['acf'] = get_fields($posts->ID);
			
        
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
            
    $posts_list = get_posts(array('numberposts'=>'-1','post_type'=> array('post', 'page','council'),'sort_order' => 'desc'));
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


// add_action( 'init', 'my_blob_cpt' );
// function my_blob_cpt() {
//     $args = array(
//       'public'       => true,
//       'show_in_rest' => true,
//       'label'        => 'Blobs',
//       'rest_base' => 'blobs',
//       'rewrite' => array( 'with_front' => false ),
		
//     );
//     register_post_type( 'blob', $args );
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
    $preview_url = "https://cjcc.icjia.cloud/preview/?token=icjia&url=wp/v2/".$post->post_type."s/".$post->ID;
    return $preview_url;
}


/**
 * Add 'blobmeta' endpoint
 */
add_action( 'rest_api_init', 'my_register_blobmeta');
function my_register_blobmeta() {
            
        register_rest_route( 'wp/v2', 'blobmeta', array(
                'methods' => 'GET',
                'callback' => 'blob_meta',
               
        )
        );
}
function blob_meta() {
    $blob_list = get_posts(array('numberposts'=>'-1','post_type'=>'blob','sort_order' => 'desc'));
    $blob_array = array();
    
    foreach( $blob_list as $blob) {
 
        	$myBlob = array ();
        	$myBlob['id'] = $blob->ID;
        	
        	$myBlob['date'] = $blob->post_date ; 
        	$myBlob['title'] = $blob->post_title ;
        	
        	$myBlob['status'] = $blob->post_status;
        	$myBlob['slug'] = $blob->post_name;
        	
        	$myBlob['modified'] = $blob->post_modified;
  
			$myBlob['acf'] = get_fields($blob->ID);
			$myBlob['content'] = $blob->post_content;
			
        
        	array_push($blob_array, $myBlob);
		
        
    }
    
    wp_reset_postdata();
    return rest_ensure_response( $blob_array);
}


/**
 * Add 'blobmeta' endpoint
 */
add_action( 'rest_api_init', 'my_register_councilmeta');
function my_register_councilmeta() {
            
        register_rest_route( 'wp/v2', 'councilmeta', array(
                'methods' => 'GET',
                'callback' => 'council_meta',
               
        )
        );
}


function council_meta() {
    $council_list = get_posts(array('numberposts'=>'-1','post_type'=>'council','sort_order' => 'desc'));
    $council_array = array();
    
    foreach( $council_list as $council) {
 
        	$myCouncil = array ();
        	$myCouncil['id'] = $council->ID;
        	
        	$myCouncil['date'] = $council->post_date ; 
        	$myCouncil['title'] = $council->post_title ;
        	
        	$myCouncil['status'] = $council->post_status;
        	$myCouncil['slug'] = $council->post_name;
        	
        	$myCouncil['modified'] = $council->post_modified;
  
			$myCouncil['acf'] = get_fields($council->ID);
			$myCouncil['content'] = $council->post_content;
			
        
        	array_push($council_array, $myCouncil);
		
        
    }
    
    wp_reset_postdata();
    return rest_ensure_response( $council_array);
}

// Remove quick edit from admin edit screen
add_filter( 'post_row_actions', 'my_disable_quick_edit', 10, 2 );
add_filter( 'page_row_actions', 'my_disable_quick_edit', 10, 2 );

function my_disable_quick_edit( $actions = array(), $post = null ) {

    // Remove the Quick Edit link
    if ( isset( $actions['inline hide-if-no-js'] ) ) {
        unset( $actions['inline hide-if-no-js'] );
    }

    // Return the set of links without Quick Edit
    return $actions;

}


// inspired by: https://gist.github.com/rveitch/9018669face1686e74aaa68026856f36
// add iitle to CPTs which doesn't provide a title (useful for the relationship field (https://www.advancedcustomfields.com/resources/relationship/))

// function sync_acf_post_title($post_id, $post, $update) {

// 	$post_type = get_post_type($post_id);

//   // check for the current CPT
// 	if($post_type === "blob") {
    
//     // get the field you want to save in the title
// 		$title = get_field('title', $post_id);

// 	} else if($post_type === "cpt_name_2") {

// 		$title = get_field('acf_field_name', $post_id);

// 	} else {

//     //if it's not a CPT, the title should be saved as usual
// 		$title = $post->post_title;

//  }

//   $content = array(
//     'ID' => $post_id,
//     'post_title' => $title
// 	);

//   // to prevent a loop
// 	remove_action('save_post', 'sync_acf_post_title');
// 	wp_update_post($content);

// }

// // is triggered when a user presses the update or publish button
// add_action('save_post', 'sync_acf_post_title', 10, 3);
// 
// 
// 
// 

add_action( 'admin_bar_menu', 'customize_my_wp_admin_bar', 80 );
function customize_my_wp_admin_bar( $wp_admin_bar ) {

    //Get a reference to the view-site node to modify.
    $node = $wp_admin_bar->get_node('view-site');

    //Change target
    $node->meta['target'] = '_blank';

    //Update Node.
    $wp_admin_bar->add_node($node);
	
	//Get a reference to the view-site node to modify.
    $node = $wp_admin_bar->get_node('site-name');

    //Change target
    $node->meta['target'] = '_blank';

    //Update Node.
    $wp_admin_bar->add_node($node);

}


// Change the "View" link on the all posts page.
function my_custom_view_link( $actions, $page_object ) {

  $title = _draft_or_post_title();

  $actions['view'] = sprintf(
    '<a href="%s" rel="permalink" aria-label="%s">%s</a>',
    my_custom_permalink( $post->ID ),
    esc_attr( sprintf( __( 'View &#8220;%s&#8221;', 'my-text-domain' ), $title ) ),
    __( 'View', 'my-text-domain' )
  );

  return $actions;
}
add_filter( 'post_row_actions', 'my_custom_view_link', 10, 2 );


// Change the "Post updated" link on the edit post page after saved.
function my_custom_post_updated_messages( $messages ) {
  global $post_ID;

  $view_page_link_html = sprintf( ' <a href="%1$s">%2$s</a>',
    esc_url( my_custom_permalink( $post_ID ) ),
    __( 'View post', 'my-text-domain' )
  );

  $messages['post'][1] = __( 'Post updated', 'my-text-domain' ) . $view_page_link_html;

  return $messages;
}
add_filter( 'post_updated_messages', 'my_custom_post_updated_messages', 10, 1 );


// Change the "Post updated" link on the edit post/page after saved.
function my_custom_post_preview_link( $return, $post_id, $new_title, $new_slug, $post ) {

  if ( 'publish' !== $post->post_status ) {
    return $return;
  }

  if ( false === strpos( $permalink, '%postname%' ) ) {

    $view_link      = my_custom_permalink( $post_id );
    $display_link   = urldecode( $view_link );
    $preview_target = " target='wp-preview-{$post->ID}'";

    $return = '<strong>' . __( 'Permalink:', 'my-text-domain' ) . "</strong>\n";
    $return .= '<a id="sample-permalink" href="' . esc_url( $view_link ) . '"' . $preview_target . '>' . esc_html( $display_link ) . "</a>\n";

  }

  return $return;
}
add_filter( 'get_sample_permalink_html', 'my_custom_post_preview_link', 10, 5 );


// Replace the base url with a custom one.
function my_custom_permalink( $post_id ) {
  return str_replace( home_url(), 'https://cjcc.icjia.cloud', get_permalink( $post_id ) );
}




?>