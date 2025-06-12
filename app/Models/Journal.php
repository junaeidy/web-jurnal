<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    protected $fillable = [
        'title',
        'cover',
        'description',
        'link',
        'acceptance_rate',
        'decision_days',
        'impact_factor',
        'is_active',
        'is_featured',
    ];

    protected $casts = [
        'acceptance_rate' => 'float',
        'decision_days' => 'integer',
        'impact_factor' => 'float',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];
}
