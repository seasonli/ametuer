<?php
/**
 * @package Superhero
 * @since Superhero 1.0
 */
$featured = superhero_get_featured_posts();

if ( empty( $featured ) )
	return;
?>

<div id="featured-content" class="flexslider">
	<ul class="featured-posts slides">

		<?php
		foreach ( $featured as $post ) :
			setup_postdata( $post );

			if ( '' != get_the_post_thumbnail() ) :
				// Now let's check the image.
				$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'slider-img' );

				// If it is greater than 960 in width, let's skip
				if ( $image[1] >= 960 ) :
		?>
					<li class="featured">
						<a href="<?php the_permalink(); ?>" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s', 'superhero' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark"><?php the_post_thumbnail( 'slider-img' ); ?></a>
						<div class="featured-hentry-wrap">
							<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
								<div class="entry-header">
									<h2 class="entry-title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
								</div><!-- .entry-header -->
							</div><!-- #post-## -->
						</div><!-- .featured-hentry-wrap -->
					</li>
		<?php
				endif;
			endif;
		endforeach;
		wp_reset_postdata();
		?>
	</ul><!-- .featured-posts -->
</div><!-- #featured-content -->