<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    protected $fillable = ['name', 'logo', 'link', 'description'];

    protected $appends = ['logo_url'];

    public function getLogoUrlAttribute()
    {
        return $this->logo
            ? asset('storage/' . $this->logo)
            : null;
    }
}