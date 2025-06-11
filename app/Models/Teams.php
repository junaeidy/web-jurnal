<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teams extends Model
{
    protected $fillable = [
        'name',
        'position',
        'photo',
        'description',
        'email',
        'contact',
        'is_active',
    ];
}
