import React from 'react';

const About = () => {
  return (
    <div>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-6">
          About <span className="text-primary">GameNews</span>
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          We are passionate gamers dedicated to bringing you the most accurate, timely, and comprehensive gaming news from around the globe.
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Our Mission</h2>
        <p className="mb-8">
          Founded in 2026, GameNews was created with a single vision: to elevate the standard of video game journalism. We believe that gaming is more than just entertainment; it's a driving force of culture, technology, and art. Our mission is to cover the industry with the respect, depth, and unwavering integrity it deserves.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
            <h3 className="text-xl font-bold text-primary mb-3">Integrity First</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              We separate rumor from fact and always cite our sources. Our reviews are entirely unbiased, untainted by publisher influence.
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
            <h3 className="text-xl font-bold text-primary mb-3">Deep Dives</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Beyond the headlines, we craft extensive retrospectives, developer interviews, and technical analyses that you won't find anywhere else.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">The Team</h2>
        <p>
          Our global team of editors and correspondents are not just journalists; they are lifers in the gaming community. We actively play the games we write about, spanning all genres and platforms from mobile indies to massive AAA blockbusters.
        </p>
      </div>
    </div>
  );
};

export default About;
