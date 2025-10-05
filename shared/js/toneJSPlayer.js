export default {
  synths: null,
  reverb: null,
  volume: null,
  isPlaying: false,
  isLoaded: false,
  originalBpm: null,
  noteDensity: 1.0,
  scheduledNotes: [],
  recorder: null,
  recordedChunks: [],
  isRecording: false,

  async load(path) {
    if (this.isLoaded) return;

    await Tone.start();
    const resp = await fetch(`/shared/music/${path}`);
    const midiData = await resp.json();

    this.originalBpm = midiData.header.tempos[0].bpm;
    this.midiData = midiData;
    this.recorder = new Tone.Recorder();
    this.distortion = new Tone.Distortion(0).toDestination();
    this.distortion.connect(this.recorder);
    this.delay = new Tone.FeedbackDelay("8n", 0).connect(this.distortion);
    this.filter = new Tone.Filter(5000, "lowpass").connect(this.delay);
    this.reverb = new Tone.Reverb({ decay: 1.5, wet: 0 }).connect(this.filter);
    this.pitchShift = new Tone.PitchShift(0).connect(this.reverb);
    this.volume = new Tone.Volume(0).connect(this.pitchShift);

    this.synths = midiData.tracks.map(() =>
      new Tone.PolySynth(Tone.Synth, {
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.3,
          release: 1,
        },
      }).connect(this.volume)
    );

    Tone.Transport.bpm.value = this.originalBpm;
    this.scheduleNotes();
    this.isLoaded = true;
  },
  async startRecording() {
    if (this.recorder && !this.isRecording) {
      await this.recorder.start();
      this.isRecording = true;
    }
  },

  async stopRecording() {
    if (this.recorder && this.isRecording) {
      const recording = await this.recorder.stop();
      this.isRecording = false;
      return recording;
    }
    return null;
  },

  setPitch(semitones) {
    if (this.pitchShift) this.pitchShift.pitch = semitones;
  },

  setDistortion(percentage) {
    if (this.distortion) this.distortion.distortion = percentage / 100;
  },

  setDelay(percentage) {
    if (this.delay) this.delay.wet.value = percentage / 100;
  },

  setFilter(frequency) {
    if (this.filter) this.filter.frequency.value = frequency;
  },

  scheduleNotes() {
    this.scheduledNotes.forEach((id) => Tone.Transport.clear(id));
    this.scheduledNotes = [];

    this.midiData.tracks.forEach((track, trackIndex) => {
      track.notes.forEach((note) => {
        if (Math.random() < this.noteDensity) {
          const id = Tone.Transport.schedule((time) => {
            this.synths[trackIndex].triggerAttackRelease(
              note.name,
              note.duration,
              time,
              note.velocity
            );
          }, note.time);
          this.scheduledNotes.push(id);
        }
      });
    });
  },

  setNoteDensity(percentage) {
    this.noteDensity = percentage;

    const wasPlaying = this.isPlaying;
    const currentPosition = Tone.Transport.seconds;

    if (wasPlaying) {
      Tone.Transport.stop();
    }

    this.scheduleNotes();

    if (wasPlaying) {
      Tone.Transport.seconds = currentPosition;
      Tone.Transport.start();
    }
  },

  setTempo(percentage) {
    if (this.originalBpm) {
      Tone.Transport.bpm.value = this.originalBpm * percentage;
    }
  },

  setVolume(db) {
    if (this.volume) this.volume.volume.value = db;
  },

  setReverb(percentage) {
    if (this.reverb) this.reverb.wet.value = percentage / 100;
  },

  setAttack(seconds) {
    if (this.synths) {
      this.synths.forEach((synth) => {
        synth.set({ envelope: { attack: seconds } });
      });
    }
  },

  setRelease(seconds) {
    if (this.synths) {
      this.synths.forEach((synth) => {
        synth.set({ envelope: { release: seconds } });
      });
    }
  },

  play() {
    Tone.Transport.start();
    this.isPlaying = true;
  },

  pause() {
    Tone.Transport.pause();
    this.isPlaying = false;
  },

  stop() {
    Tone.Transport.stop();
    if (this.synths) {
      this.synths.forEach((synth) => {
        synth.releaseAll();
      });
    }
    this.isPlaying = false;
  },

  restart() {
    Tone.Transport.stop();
    Tone.Transport.seconds = 0;
    Tone.Transport.start();
    this.isPlaying = true;
  },
};
