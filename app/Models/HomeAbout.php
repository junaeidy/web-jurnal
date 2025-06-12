<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeAbout extends Model
{
    protected $fillable = [
        'title',
        'content',
        'image',
        'google_form_link',
        'whatsapp_link',
    ];
}
