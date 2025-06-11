<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Events extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title',
        'description',
        'event_date',
        'location',
        'image',
        'related_link',
        'is_active',
    ];
}
