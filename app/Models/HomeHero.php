<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeHero extends Model
{
    protected $table = 'home_heroes';

    protected $fillable = [
        'title',
        'subtitle',
        'image',
        'cta_text',
        'cta_link'
    ];
}
