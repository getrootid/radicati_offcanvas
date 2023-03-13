<?php

namespace Drupal\radicati_offcanvas\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;

/**
 * Provides the Header Search Block.
 *
 * @Block(
 *   id = "off_canvas_toggle",
 *   admin_label = @Translation("Off-canvas Toggle"),
 *   category = @Translation("radicati"),
 * )
 *
 */
class OffcanvasToggleBlock extends BlockBase
{
  public function build()
  {

    return [
      '#theme'  => 'radicati_offcanvas_toggle',
      '#label' => 'Menu',
      '#label_display' => 'none',
      '#attached' => [
        'library' => [
          'radicati_offcanvas/rad_offcanvas',
        ]
      ]
    ];
  }
}
