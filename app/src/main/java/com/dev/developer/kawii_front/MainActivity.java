package com.dev.developer.kawii_front;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
  TextView sin;
  LinearLayout circle;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    circle = (LinearLayout)findViewById(R.id.circle);
    sin = (TextView)findViewById(R.id.sin);

    circle.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {

        Intent it = new Intent(MainActivity.this,signup.class);
        startActivity(it);

      }
    });
    sin.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        Intent it = new Intent(MainActivity.this,signin.class);
        startActivity(it);
      }
    });

  }
}
