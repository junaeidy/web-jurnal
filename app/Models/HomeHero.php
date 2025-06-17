<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeHero extends Model
{

    protected $fillable = [
        'title',
        'subtitle',
        'image',
        'cta_text',
        'cta_link'
    ];

    protected $casts = [
        'title' => 'array',
        'subtitle' => 'array',
        'cta_text' => 'array',
    ];
}
