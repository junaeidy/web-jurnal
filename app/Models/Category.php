<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'is_active'];

    public function journals()
    {
        return $this->belongsToMany(Journal::class);
    }
}
