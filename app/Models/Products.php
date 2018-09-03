<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $fillable = ['name', 'description', 'short_description', 'price', 'views', 'user_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function  user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

}


