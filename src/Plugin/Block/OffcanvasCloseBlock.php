<?php

namespace Drupal\radicati_offcanvas\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;

/**
 * Provides the Header Search Block.
 *
 * @Block(
 *   id = "off_canvas_close",
 *   admin_label = @Translation("Off-canvas Close"),
 *   category = @Translation("radicati"),
 * )
 *
 */
class OffcanvasCloseBlock extends BlockBase
{
  public function build()
  {
    return [
      '#theme'  => 'radicati_offcanvas_close',
      '#label' => 'Close Menu',
      '#label_display' => 'none',
      '#attached' => [
        'library' => [
          'radicati_offcanvas/rad_offcanvas',
        ]
      ]
    ];
  }
}
